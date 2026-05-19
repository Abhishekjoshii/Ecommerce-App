FROM python:3.11-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app


COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt


COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD sh -c "cd frontend && npm start & cd /app/backend && python app.py"