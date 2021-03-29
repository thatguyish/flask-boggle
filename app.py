from flask.json import jsonify
from boggle import Boggle
from flask import Flask, render_template,session,redirect,request

boggle_game = Boggle()

app = Flask(__name__)
app.secret_key = "abc123"

def initialize_session():
    if "high_score" not in session.keys():
        session['high_score']=0
    if "amount-of-plays" not in session.keys():
        session['amount-of-plays']=0 

@app.route('/')
def home_view():
    initialize_session()
    return render_template('base.html')

@app.route('/game')
def game_view():
    game_board = boggle_game.make_board(8,8)

    session['game_board'] = game_board
    return render_template('game.html',game_board = game_board)

@app.route('/validate-word/<word>')
def validate_view(word):
    if word in boggle_game.words:
        result = boggle_game.check_valid_word(session['game_board'],word)
        return jsonify(result)
    else:
        return "not-a-word"


@app.route('/game-over',methods=['POST'])
def game_over_view():
    if request.method == "POST":
        if request.json['data']['score']>session['high_score']:
            session['high_score'] = request.json['data']['score']
        session['amount-of-plays'] +=1
    return "value-updated"
