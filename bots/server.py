from flask import Flask, jsonify
from flask_cors import CORS
from bot_ranker import play_two, get_leaderboard

app = Flask(__name__)
CORS(app)

@app.route('/two_play/<player1>/<player2>/<game_name>', methods=['GET'])
def two_play(player1, player2, game_name):
	result = play_two(player1, player2, game_name)
	return jsonify(result)

@app.route('/leaderboard/<game_name>', methods=['GET'])
def leaderboard(game_name):
	result = get_leaderboard(game_name)
	return jsonify(result)

@app.route('/submit_code/<name>')
def submit_code(name):
	fo = open("test.txt", "w")
	filebuffer = ["brave new world"]
	fo.writelines(filebuffer)
	fo.close()
	return ''

@app.route('/', methods=['GET'])
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)