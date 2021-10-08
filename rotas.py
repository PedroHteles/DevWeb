from threading import ExceptHookArgs
from types import MethodDescriptorType
from flask import Flask, render_template, redirect, request , url_for, session
from flask_mysqldb import MySQL, MySQLdb
import bcrypt
import re


app = Flask(__name__)

app.config['MYSQL_HOST'] = '45.93.100.29'
app.config['MYSQL_USER'] = 'pedro'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'ecomerce'

mysql = MySQL(app) 

@app.route('/') 
def index():
    return render_template('index.html')

@app.route('/jogos') 
def jogos():
    return render_template('jogos.html') 

@app.route('/home') 
def home():
    return render_template('home.html')       

@app.route('/register', methods= ["GET", "POST"])
def register():
    msg = ''
    msgcerto = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form:

        name = request.form['name']
        email = request.form['email']
        password = request.form['password'].encode('utf-8')
        has_password = bcrypt.hashpw(password, bcrypt.gensalt())

        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE name = %s', (name,))
        account = cur.fetchone()


        if not name or not password or not email:
            msg = 'Por favor, preencha o formulário!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email): # expressão regular
            msg = 'Endereço de e-mail inválido!'
        
        elif account:
            msg = 'A conta já existe!'
        elif not re.match(r'[A-Za-z0-9]+', name):  # expressão regular
            msg = 'Username must contain only characters and numbers!'

        else:
            cur.execute("INSERT INTO users (name,email,password) VALUES (%s,%s,%s)", (name,email,has_password,))
            mysql.connection.commit()
            session['name'] = name
            session['email'] = email
            return redirect("/")
            

    
    elif request.method == 'POST':
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
    return render_template('login.html', msg=msg, )
  




@app.route('/login',methods=["GET","POST"])
def login():
    msglg = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password'].encode('utf-8')

        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()


        if not email or not password:
            msglg = "Por favor, preencha o formulário!"
            return render_template('login.html', msglg=msglg, )

        if user:
            if bcrypt.hashpw(password, user["password"].encode('utf-8')) == user["password"].encode('utf-8'):
                session['name'] = user['name']
                session['email'] = user['email']
                return render_template("login.html")
            else:
                msglg = "Erro de senha e e-mail não coincidem"
                return render_template('login.html', msglg=msglg, )
        else:
            msglg = "Usuario Nao existe!"
            return render_template('login.html', msglg=msglg, )
    else:
        return render_template("login.html" )


@app.route('/logout')
def logout():
    session.clear()
    return render_template("home.html")


@app.route('/loja')
def products():
  curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
  curl.execute("SELECT * FROM product")
  rows = curl.fetchall()
  curl.close()
  return render_template('products.html', products=rows)


@app.route('/add', methods=['POST'])
def add_product_to_cart():
    if request.method == 'POST'  and 'quantity' in request.form and 'code' in request.form :
            _quantity = int(request.form['quantity'])
            _code = request.form['code']
            
            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM product WHERE code=%s", (_code,))
            row = curl.fetchone()

            itemArray = { row['code'] : {'name' : row['name'], 'code' : row['code'], 'quantity' : _quantity, 'price' : row['price'], 'image' : row['image'], 'total_price': _quantity * row['price']}}
            
            all_total_price = 0
            all_total_quantity = 0

            
            if 'cart_item' in session:
                if row['code'] in session['cart_item']:
                    for key, value in session['cart_item'].items():
                        if row['code'] == key:

                            old_quantity = session['cart_item'][key]['quantity']
                            total_quantity = old_quantity + _quantity
                            session['cart_item'][key]['quantity'] = total_quantity
                            session['cart_item'][key]['total_price'] = total_quantity * row['price']

                else:
                    session['cart_item'] = array_merge(session['cart_item'], itemArray)

                for key, value in session['cart_item'].items():
                    individual_quantity = int(session['cart_item'][key]['quantity'])
                    individual_price = float(session['cart_item'][key]['total_price'])
                    all_total_quantity = all_total_quantity + individual_quantity
                    all_total_price = all_total_price + individual_price
            else:
                session['cart_item'] = itemArray
                all_total_quantity = all_total_quantity + _quantity
                all_total_price = all_total_price + _quantity * row['price']
            
            session['all_total_quantity'] = all_total_quantity
            session['all_total_price'] = all_total_price
            
            return redirect(url_for('.products'))
    else:
        return 'Error while adding item to cart'




def array_merge( first_array , second_array ):
 if isinstance( first_array , list ) and isinstance( second_array , list ):
  return first_array + second_array

 elif isinstance( first_array , dict ) and isinstance( second_array , dict ):
  return dict( list( first_array.items() ) + list( second_array.items() ) )

 elif isinstance( first_array , set ) and isinstance( second_array , set ):
  return first_array.union( second_array )
 return False



@app.route('/aopa',methods=["GET","POST"])
def testeeee():
    if 'cart_item' in session:
        print(session['cart_item'])
    else:
        print('nada')
         

    return render_template("teste.html",)





@app.route('/empty')
def empty_cart():
 try:
  session.clear()
  return redirect(url_for('.products'))
 except Exception as e:
  print(e)
 
@app.route('/delete/<string:code>')
def delete_product(code):
 try:
  all_total_price = 0
  all_total_quantity = 0
  session.modified = True
   
  for item in session['cart_item'].items():
   if item[0] == code:    
    session['cart_item'].pop(item[0], None)
    if 'cart_item' in session:
     for key, value in session['cart_item'].items():
      individual_quantity = int(session['cart_item'][key]['quantity'])
      individual_price = float(session['cart_item'][key]['total_price'])
      all_total_quantity = all_total_quantity + individual_quantity
      all_total_price = all_total_price + individual_price
    break
   
  if all_total_quantity == 0:
   session.clear()
  else:
   session['all_total_quantity'] = all_total_quantity
   session['all_total_price'] = all_total_price
   
  return redirect(url_for('.products'))
 except Exception as e:
  print(e)
   
def array_merge( first_array , second_array ):
 if isinstance( first_array , list ) and isinstance( second_array , list ):
  return first_array + second_array
 elif isinstance( first_array , dict ) and isinstance( second_array , dict ):
  return dict( list( first_array.items() ) + list( second_array.items() ) )
 elif isinstance( first_array , set ) and isinstance( second_array , set ):
  return first_array.union( second_array )
 return False


if __name__ == '__main__':
    app.secret_key = "^A%DJAJU^JJ123"
    app.run(debug=True)