#!/bin/bash
# notify.sh — Push an app update notification to Firebase after deployment
# Usage: ./notify.sh "Feature title" "Short description of what was added"
# Example: ./notify.sh "Trip Gallery added 📸" "Everyone can now upload and share their best photo of the day"

TITLE="${1:-App Updated 🚀}"
DESC="${2:-New features have been added. Please hard refresh.}"
DB_URL="https://europe-trip-2026-11512-default-rtdb.firebaseio.com/appUpdate.json"
TS=$(date +%s%3N)   # milliseconds since epoch

PAYLOAD=$(cat <<JSON
{
  "title": "$TITLE",
  "desc": "$DESC",
  "ts": $TS
}
JSON
)

echo "📡 Posting update notification to Firebase..."
curl -s -X PUT \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$DB_URL"

echo ""
echo "✅ Done! Update banner will appear on everyone's phone."
echo ""
echo "🔔 Notification content:"
echo "   Title: $TITLE"
echo "   Desc:  $DESC"
