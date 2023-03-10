from functools import wraps
from flask import request, jsonify, make_response
from config import *
import sqlite3
import time


def authenticated(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if 'token' in request.headers and 'user_id' in request.headers:
            auth_token = request.headers['token']
            user_id = get_user_id_from_header()

            id = get_user_id_from_token(auth_token)
            if not id or id != user_id:
                return make_response(
                    jsonify("Invalid access as token or user_id invalid.")
                )
        else:
            return make_response(
                jsonify("Invalid access, no token or user_id found.")
            )
        return func(*args, **kwargs)
    return wrap


def get_user_id_from_token(token):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT id from users where token = '{}'".format(token)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return None
    else:
        return rows[0][0]


def get_user_name_from_user_id(id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT name from users where id = '{}'".format(id)
    rows = cur.execute(sql).fetchall()
    print(rows)
    if len(rows) == 0:
        return None
    else:
        return rows[0][0]


def get_user_id_from_header():
    return int(request.headers['user_id'])


def get_unix_time():
    return int(time.time())
