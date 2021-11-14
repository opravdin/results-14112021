from flask import Flask, request, jsonify
from model import predict
import json

app = Flask(__name__)

@app.route('/search',  methods=['GET'])
def execute():
    query = request.args
    response = jsonify(predict(query['q']))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # return json.dumps(predict(query['q'])).encode('utf8')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=80)