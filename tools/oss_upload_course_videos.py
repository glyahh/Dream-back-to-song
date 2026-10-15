from __future__ import annotations

import os
from pathlib import Path

import oss2


def must_env(name: str) -> str:
    v = os.environ.get(name, "").strip()
    if not v:
        raise SystemExit(f"Missing env var: {name}")
    return v


def main() -> None:
    # Required env vars (do NOT hardcode secrets in repo)
    access_key_id = must_env("ALIYUN_OSS_ACCESS_KEY_ID")
    access_key_secret = must_env("ALIYUN_OSS_ACCESS_KEY_SECRET")

    endpoint = os.environ.get("ALIYUN_OSS_ENDPOINT", "oss-cn-hangzhou.aliyuncs.com").strip()
    bucket_name = os.environ.get("ALIYUN_OSS_BUCKET", "dream-back-to-song").strip()
    prefix = os.environ.get("ALIYUN_OSS_PREFIX", "course-videos/").lstrip("/")

    source_dir = Path("tools/course-videos-h264")
    if not source_dir.exists():
        raise SystemExit(f"Source directory not found: {source_dir}")

    files = [
        "song_clothing_form.mp4",
        "beizi_craft.mp4",
        "song_color_matching.mp4",
        "official_vs_commoner.mp4",
        "song_accessory_culture.mp4",
    ]

    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, f"https://{endpoint}", bucket_name)

    for name in files:
        src = source_dir / name
        if not src.exists():
            raise SystemExit(f"Missing file: {src}")
        key = f"{prefix}{name}"
        print(f"UPLOAD {src} -> oss://{bucket_name}/{key}", flush=True)
        bucket.put_object_from_file(key, str(src))
        print("OK", key, flush=True)


if __name__ == "__main__":
    main()

