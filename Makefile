# Django-related commands
runserver:
	python manage.py runserver

migrate:
	python manage.py migrate

collectstatic:
	python manage.py collectstatic --no-input

# Virtual environment and dependency management
venv:
	python -m venv venv
	source venv/bin/activate && pip install --upgrade pip
	pip install -r requirements.txt

# Frontend-related commands
frontend-install:
	npm ci --prefix ./frontend

frontend-build:
	npm run build --prefix ./frontend

# Start the Django application with Gunicorn
start:
	make collectstatic
	make migrate
	gunicorn backend.wsgi --log-file -