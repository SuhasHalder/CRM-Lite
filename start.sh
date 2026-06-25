#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Sales CRM Startup ===${NC}\n"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${BLUE}Stopping services...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${GREEN}Starting Backend...${NC}"
cd backend
npm run build > /tmp/backend-build.log 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Backend build successful"
    node dist/server.js > /tmp/backend.log 2>&1 &
    BACKEND_PID=$!
    echo "✓ Backend started (PID: $BACKEND_PID)"
    sleep 3
else
    echo "✗ Backend build failed"
    cat /tmp/backend-build.log
    exit 1
fi

# Start frontend
echo -e "${GREEN}Starting Frontend...${NC}"
cd ../frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✓ Frontend started (PID: $FRONTEND_PID)"
sleep 5

echo -e "\n${GREEN}✓ All services started!${NC}\n"
echo -e "Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "Backend:  ${BLUE}http://localhost:4000${NC}"
echo -e "Login:    ${BLUE}http://localhost:3000/login${NC}\n"

# Keep the script running
wait $BACKEND_PID $FRONTEND_PID
