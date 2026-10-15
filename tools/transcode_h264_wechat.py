from __future__ import annotations

import os
import subprocess
from pathlib import Path

import imageio_ffmpeg


def main() -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

    in_dir = Path("tools/course-videos-source")
    out_dir = Path("tools/course-videos-h264")
    out_dir.mkdir(parents=True, exist_ok=True)

    files = [
        "song_clothing_form.mp4",
        "beizi_craft.mp4",
        "song_color_matching.mp4",
        "official_vs_commoner.mp4",
        "song_accessory_culture.mp4",
    ]

    # WeChat mini-program video decoding is picky:
    # - H.264 baseline + AAC
    # - yuv420p
    # - even width/height
    # Also avoid upscaling: only downscale when height > 720.
    vf = (
        "scale='if(gt(ih,720),-2,iw)':'if(gt(ih,720),720,ih)',"
        "scale=trunc(iw/2)*2:trunc(ih/2)*2"
    )

    for f in files:
        src = in_dir / f
        dst = out_dir / f
        if dst.exists():
            dst.unlink()

        print("TRANSCODE", f, flush=True)
        cmd = [
            ffmpeg,
            "-y",
            "-i",
            str(src),
            "-vf",
            vf,
            "-c:v",
            "libx264",
            "-profile:v",
            "baseline",
            "-level",
            "3.0",
            "-pix_fmt",
            "yuv420p",
            "-preset",
            "veryfast",
            "-crf",
            "28",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(dst),
        ]
        subprocess.check_call(cmd)
        print("OK", f, os.path.getsize(dst), flush=True)

    print("DONE", flush=True)


if __name__ == "__main__":
    main()

