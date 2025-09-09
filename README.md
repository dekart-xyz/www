# Dekart Documentation Website

## Video Poster Images

To extract a poster image from a video file for use as a preview while the video loads, use the following ffmpeg command:

```bash
ffmpeg -i static/main-page-screencast-4.mp4 -vf "select=eq(n\,0)" -vsync vfr -q:v 2 static/main-page-screencast-4.png
```
