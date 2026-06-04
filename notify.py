#!/usr/bin/env python3
# notify.py — Push an app update notification to Firebase after deployment
# Usage: python3 notify.py "Feature title" "Short description"
# Example: python3 notify.py "Trip Gallery added 📸" "Upload and share your best photo of the day"

import sys
import json
import time
import urllib.request

DB_URL = "https://europe-trip-2026-11512-default-rtdb.firebaseio.com/appUpdate.json"

title = sys.argv[1] if len(sys.argv) > 1 else "App Updated 🚀"
desc  = sys.argv[2] if len(sys.argv) > 2 else "New features added. Please hard refresh."

payload = json.dumps({
    "title": title,
    "desc":  desc,
    "ts":    int(time.time() * 1000)
}).encode("utf-8")

print(f"📡 Posting update notification to Firebase...")
req = urllib.request.Request(DB_URL, data=payload, method="PUT",
      headers={"Content-Type": "application/json; charset=utf-8"})
try:
    with urllib.request.urlopen(req) as resp:
        result = resp.read().decode()
    print(f"✅ Done! Banner will appear on everyone's phone.")
    print(f"\n🔔 Notification:")
    print(f"   Title: {title}")
    print(f"   Desc:  {desc}")
except Exception as e:
    print(f"❌ Error: {e}")
