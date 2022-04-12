#!/bin/bash
set -e


/wait-for-it.sh $SQL_HOST:$SQL_PORT -t 600
python manage.py migrate

exec "$@"
