from flask import Flask, jsonify
import json
import os
app = Flask(__name__)

emotions = ["Happy", "Sad", "Excited", "Surprise", "Neutral"]
emotion_totals_per_raspid = {emotion: {} for emotion in emotions}
views_per_raspid = {}
highest_frame_numbers = {}


with open('C://Documents//SDS//mydata.csv', newline='') as file: #change path for where the raw data csv file is located. 
    lines = file.readlines()

lines = lines[1:]
for line in lines:
    data = line.strip().split(",")
    raspid = int(data[0])
    sessionid = int(data[1])
    emotion_values = [int(value) for value in data[3:8]]
    timestamp = data[8]
    views_per_raspid.setdefault(raspid, set())

    frame_number = int(data[2])

    if raspid not in highest_frame_numbers:
        highest_frame_numbers[raspid] = {}

    if sessionid not in highest_frame_numbers[raspid] or frame_number > highest_frame_numbers[raspid][sessionid]:
        highest_frame_numbers[raspid][sessionid] = frame_number

    for i, emotion in enumerate(emotions):
        emotion_totals_per_raspid[emotion].setdefault(raspid, {})
        emotion_totals_per_raspid[emotion][raspid].setdefault(sessionid, [])
        emotion_totals_per_raspid[emotion][raspid][sessionid].append(emotion_values[i])
        views_per_raspid[raspid].add(sessionid)

@app.route('/json', methods=['GET'])
def json_1():
    results_dict = []
    for raspid in highest_frame_numbers.keys():
        for sessionid in highest_frame_numbers[raspid].keys():
            result_entry = {
                "RaspID": raspid,
                "SessionID": sessionid,
                "AVG. Happy": sum(emotion_totals_per_raspid["Happy"][raspid][sessionid]) / len(emotion_totals_per_raspid["Happy"][raspid][sessionid]),
                "AVG. Sad": sum(emotion_totals_per_raspid["Sad"][raspid][sessionid]) / len(emotion_totals_per_raspid["Sad"][raspid][sessionid]),
                "AVG. Excited": sum(emotion_totals_per_raspid["Excited"][raspid][sessionid]) / len(emotion_totals_per_raspid["Excited"][raspid][sessionid]),
                "AVG. Surprise": sum(emotion_totals_per_raspid["Surprise"][raspid][sessionid]) / len(emotion_totals_per_raspid["Surprise"][raspid][sessionid]),
                "AVG. Neutral": sum(emotion_totals_per_raspid["Neutral"][raspid][sessionid]) / len(emotion_totals_per_raspid["Neutral"][raspid][sessionid]),
                "Seconds": highest_frame_numbers[raspid][sessionid]
            }
            results_dict.append(result_entry)

    filename = 'Artization_Data_Results_per_View.json'
    with open(filename, 'w') as json_file:
        json.dump(results_dict, json_file, indent=4)

    return jsonify(message="File generated and saved.")

@app.route('/json2', methods=['GET'])
def json_2():
    results_dict = []
    for raspid in views_per_raspid.keys():
        total_highest_frame_numbers = sum(highest_frame_numbers[raspid].values())
        result_entry = {
            "RaspID": raspid,
            "Total Views": len(views_per_raspid[raspid]),
            "Total Seconds": total_highest_frame_numbers
        }

        for emotion in emotions:
            emotion_values = emotion_totals_per_raspid[emotion].get(raspid, {})
            emotion_values = [value for values in emotion_values.values() for value in values]
            average_emotion = sum(emotion_values) / len(emotion_values)
            result_entry[f"Avg. {emotion}"] = round(average_emotion, 2)

        results_dict.append(result_entry)
    filename = 'Artization_Data_Results_total.json'
    with open(filename, 'w') as json_file:
        json.dump(results_dict, json_file, indent=4)

    return jsonify(message="File generated and saved.")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
