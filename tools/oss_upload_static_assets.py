from __future__ import annotations

import mimetypes
import os
from pathlib import Path

import oss2


DEFAULT_ASSETS_DIR = Path(__file__).resolve().parents[2] / "项目资源" / "梦回宋朝" / "images"


def must_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise SystemExit(f"Missing env var: {name}")
    return value


def main() -> None:
    access_key_id = must_env("ALIYUN_OSS_ACCESS_KEY_ID")
    access_key_secret = must_env("ALIYUN_OSS_ACCESS_KEY_SECRET")

    endpoint = os.environ.get("ALIYUN_OSS_ENDPOINT", "oss-cn-hangzhou.aliyuncs.com").strip()
    bucket_name = os.environ.get("ALIYUN_OSS_BUCKET", "dream-back-to-song").strip()
    local_root = Path(
        os.environ.get("STATIC_ASSETS_DIR", str(DEFAULT_ASSETS_DIR)).strip()
    ).resolve()
    remote_prefix = os.environ.get("STATIC_ASSETS_PREFIX", "static/").strip().lstrip("/")

    if not local_root.exists():
        raise SystemExit(f"Static assets directory not found: {local_root}")

    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, f"https://{endpoint}", bucket_name)

    image_extensions = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
    files = sorted(
        p for p in local_root.rglob("*")
        if p.is_file() and p.suffix.lower() in image_extensions
    )
    if not files:
        raise SystemExit(f"No images found under: {local_root}")

    print(f"UPLOAD START files={len(files)} local={local_root}", flush=True)
    for local_path in files:
        rel = local_path.relative_to(local_root).as_posix()
        object_key = f"{remote_prefix}{rel}"
        content_type, _ = mimetypes.guess_type(local_path.name)
        headers = {}
        if content_type:
            headers["Content-Type"] = content_type
        print(f"UPLOAD {local_path} -> oss://{bucket_name}/{object_key}", flush=True)
        bucket.put_object_from_file(object_key, str(local_path), headers=headers)

    print("UPLOAD DONE", flush=True)


if __name__ == "__main__":
    main()
