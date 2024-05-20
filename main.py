import flask
from flask import request, jsonify

import database
import domain
import api_response
database.create_table() # データベース初期化

app = flask.Flask(__name__)


@app.route('/text-file', methods=['POST'])
def create_text_file():
    data = request.get_json()
    file_name = data['fileName']
    content = data['content']

    text_file = database.create_txt_file(domain.TextFile(file_name, content))
    return jsonify({
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    })

@app.route('/text-file', methods=['GET'])
def get_text_file():
    data = request.get_json()
    file_name = data['fileName']

    text_file = database.get_txt_file(file_name)
    return jsonify({
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    })

@app.route('/text-file', methods=['PUT'])
def update_text_file():
    data = request.get_json()
    file_name = data['fileName']
    content = data['content']

    text_file = database.update_txt_file(domain.TextFile(file_name, content))
    return jsonify({
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    })

@app.route('/text-file', methods=['DELETE'])
def delete_text_file():
    data = request.get_json()
    file_name = data['fileName']

    text_file = database.delete_txt_file(file_name)
    return jsonify({
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    })

@app.route('/text-file/all', methods=['GET'])
def get_all_text_files():
    text_files = database.get_all_txt_files()
    return jsonify({
        'message': 'success',
        'textFiles': [{
            'filename': text_file.filename,
            'content': text_file.content
        } for text_file in text_files]
    })

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8080)