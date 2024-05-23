import os
import sys
import flask
from flask import request, jsonify

sys.path.append(os.path.dirname(__file__))

import database
import usecase
database.create_table() # データベース初期化

app = flask.Flask(__name__)

# TODO: 各エンドポイントの引数のエラーハンドリング

@app.route('/text-file', methods=['POST'])
def create_text_file():
    data = request.get_json()
    name = data['name']
    content = data['content']

    text_file = usecase.text_file.create(name, content)
    return jsonify({
        'message': 'success',
        'textFile': text_file.to_dict()
    })

@app.route('/text-file/<text_file_id>', methods=['GET'])
def get_text_file(text_file_id):
    text_file = usecase.text_file.get(text_file_id) # TODO: TextFileが存在しない場合のエラーハンドリング
    return jsonify({
        'message': 'success',
        'textFile': text_file.to_dict()
    })

@app.route('/text-file/<text_file_id>', methods=['PUT'])
def update_text_file(text_file_id):
    data = request.get_json()
    name = data['name']
    content = data['content']

    text_file = usecase.text_file.update(text_file_id, name, content) # TODO: TextFileが存在しない場合のエラーハンドリング

    return jsonify({
        'message': 'success',
        'textFile': text_file.to_dict()
    })

@app.route('/text-file/<text_file_id>', methods=['DELETE'])
def delete_text_file(text_file_id):
    text_file_id = usecase.text_file.delete(text_file_id) # TODO: 存在しないTextFileを削除しようとした場合のエラーハンドリング
    return jsonify({
        'message': 'success',
        'textFileID': text_file_id
    })

@app.route('/text-file/all', methods=['GET'])
def get_all_text_files():
    text_files = usecase.text_file.get_all()
    return jsonify({
        'message': 'success',
        'textFiles': [text_file.to_dict() for text_file in text_files]
    })

@app.route('/exploratory-search', methods=['POST'])
def exploratory_search():
    data = request.get_json()
    text_file_ids = data['textFileIDs']
    word = data['word']

    result = usecase.exploratory_search.search_by_word(text_file_ids, word)
    return jsonify({
        'message': 'success',
        'result': result.to_dict()
    })

@app.route('/compare-q-vs-k', methods=['POST'])
def compare_q_vs_k():
    data = request.get_json()
    q_text_file_id = data['qTextFileID']
    k_text_file_ids = data['kTextFileIDs']

    result = usecase.comparison.compare_q_vs_k(q_text_file_id, k_text_file_ids)
    return jsonify({
        'message': 'success',
        'result': result.to_dict()
    })

@app.route('/consistency-k-vs-k', methods=['POST'])
def consistency_k_vs_k():
    data = request.get_json()
    text_file_ids = data['textFileIDs']
    limit = data['limit']

    result = usecase.consistency.consistency_k_vs_k(text_file_ids, limit)
    return jsonify({
        'message': 'success',
        'result': result.to_dict()
    })

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8080)