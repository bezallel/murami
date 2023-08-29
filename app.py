from flask import Flask, request, render_template
import pandas as pd
import pickle
import numpy as np
import time

model = pickle.load(open('house.pkl', 'rb'))

# Mappings for displaying labels
housing_type_mapping = {0: "Duplex", 1: "Flat/Apartment", 2: "Mini Flat"}
bedroom_mapping = {1: "1", 2: "2", 3: "3", 4: "4"}
bathroom_mapping = {1: "1", 2: "2", 3: "3", 4: "4"}
guest_toilet_mapping = {0: "0", 1: "1", 2: "2"}
parking_space_mapping = {0: "0", 1: "1", 2: "2", 3: "3", 4: "4"}
district_mapping = {
    0: "Oshodi-Mafoluku", 1: "Abule Egba", 2: "Agbado Ijaiye", 3: "Agbara", 4: "Agege",
    5: "Ajah", 6: "Alagbado", 7: "Alimosho", 8: "Allen Avenue", 9: "Apapa", 10: "Badagry",
    11: "Ejigbo", 12: "Festac", 13: "Gbagada", 14: "Idimu", 15: "Ifako", 16: "Igando",
    17: "Ijora Ebute-Metta", 18: "Iju", 19: "Iju Ishaga", 20: "Ikeja", 21: "Ikeja Adeniyi-Jones",
    22: "Ikeja G.R.A", 23: "Ikorodu", 24: "Ikotun", 25: "Ikoyi", 26: "Irepo", 27: "Isolo",
    28: "Isolo Ago-Palace", 29: "Isolo Jakande", 30: "Iyana Ipaja", 31: "Ketu Ikosi",
    32: "Ketu Ogudu", 33: "Ketu Ojota", 34: "Ketu Shangisha", 35: "Lagos Island",
    36: "Lekki", 37: "Maryland", 38: "Mushin", 39: "Ogba", 40: "Ojodu Berger",
    41: "Oke Afa", 42: "Okota", 43: "Oniru", 44: "Opebi", 45: "Oregun",
    46: "Oshodi", 47: "Oshodi Ajao", 48: "Surulere", 49: "Victoria Island", 50: "Yaba"
}


app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'GET':
        return (render_template('index.html',
                               housing_type_mapping=housing_type_mapping,
                               bedroom_mapping=bedroom_mapping,
                               bathroom_mapping=bathroom_mapping,
                               guest_toilet_mapping=guest_toilet_mapping,
                               parking_space_mapping=parking_space_mapping,
                               district_mapping=district_mapping))


@app.route('/estimate', methods=['POST'])
def predict():
    try:
        
        int_features = [int(x) for x in request.form.values()]
        features = [np.array(int_features)]
        prediction = model.predict(features)[0]
        
        formatted_prediction = '{:,.2f}'.format(prediction)
        
        # time.sleep(2)

        return render_template('index.html', prediction_text='Your estimated annual rent based on your selected amenities is ₦{}'.format(formatted_prediction))
    except ValueError:
        return render_template('index.html', prediction_text='Oops! Looks like you left something out...Please complete your selection.')

if __name__ == '__main__':
    app.run(debug=True)