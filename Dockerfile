# FROM python:3.11-alpine

# RUN apk add --no-cache nodejs npm

# WORKDIR /app


# COPY backend/requirements.txt ./backend/
# RUN pip install --no-cache-dir -r ./backend/requirements.txt


# COPY frontend/package*.json ./frontend/
# RUN cd frontend && npm install

# COPY . .

# EXPOSE 3000
# EXPOSE 5000

# CMD sh -c "cd frontend && npm start & cd /app/backend && python app.py"



FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build


FROM python:3.11-alpine

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ .

# Copy React build files
COPY --from=frontend-build /app/frontend/build ./static

EXPOSE 5000

CMD ["python", "app.py"]