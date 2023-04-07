#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
flask jwt auth
"""
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)

users = {
    'john': {
        'password': 'password123',
        'role': 'user'
    },
    'jane': {
        'password': 'password456',
        'role': 'admin'
    }
}

@app.route('/api/auth', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({'msg': 'Invalid username or password'}), 400
    if username not in users or users[username]['password'] != password:
        return jsonify({'msg': 'Invalid username or password'}), 401
    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token})

@app.route('/api/me', methods=['GET'])
@jwt_required()
def me():
    username = get_jwt_identity()
    return jsonify({'username': username, 'role': users[username]['role']})

@app.route('/api/public', methods=['GET'])
def public():
    return jsonify({'msg': 'This is a public API'})

if __name__ == '__main__':
    app.run()
