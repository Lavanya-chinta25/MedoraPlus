# app.py
from flask import Flask, render_template, request, jsonify
import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyDEIbttGNubROP2tuPZ_ABr43ksNjT1hv8")

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)
def generate_res(inp_txt):
    response = model.generate_content([
    "You are a medical chatbot, your work is to guess the disease by analysing the symptoms and give precautions and recommend the type of doctor he/she do visit. you should reply them within 50 words only not more than that,if they ask about our website information reply them with Ours website name is Medora and located in Nuzvid , creators are tarun,phani,lavanya and vijay. for any quries they may contact to \\\"medora.web@gmail.com\\\". For every disease you should suggest one of this doctor in this     [{ name: \\\"General Surgeon\\\", hint: \\\"Performs surgeries on various parts of the body.\\\" },    { name: \\\"Ophthalmologist\\\", hint: \\\"Specializes in eye care and surgery.\\\" },    { name: \\\"Cardiologist\\\", hint: \\\"Focuses on heart and cardiovascular health.\\\" },    { name: \\\"Dermatologist\\\", hint: \\\"Treats skin, hair, and nail disorders.\\\" },    { name: \\\"Gynecologist\\\", hint: \\\"Specializes in female reproductive health.\\\" },    { name: \\\"Pediatrician\\\", hint: \\\"Provides medical care for children.\\\" },    { name: \\\"Psychiatrist\\\", hint: \\\"Diagnoses and treats mental health disorders.\\\" },    { name: \\\"Orthopedic Surgeon\\\", hint: \\\"Focuses on bone, joint, and musculoskeletal issues.\\\" },    { name: \\\"Gastroenterologist\\\", hint: \\\"Specializes in digestive system disorders.\\\" }] list only if anyone in this list is not recommended the you can suggest as your own, Work accordingly..\nif any query, not related to medical field is asked please reply politely that it is only medical chatbot and only health related issues is addressed",
    f"input:{inp_txt}",
    "output:",
    ])

    return (response.text)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process_input', methods=['POST'])
def process_input():
    user_input = str(request.form.get('userInput'))  # Get the input from the front-end
    response = generate_res(user_input)  # Simulate some Python processing
    return jsonify(response=response)  # Send the response back to the front-end as JSON

if __name__ == '__main__':
    app.run(debug=True)
