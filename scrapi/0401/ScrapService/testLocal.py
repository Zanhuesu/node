import os
import csv
import json
import ijson
import time
import math

json_filename = 'AllPrices.json'
card = {}
card['uuid'] = ''
card['prices'] = []
card['currency'] = ''
count = 0
for prefix, the_type, value in ijson.parse(open(json_filename)):
        if card['uuid'] == '1ec9e0b7-3647-594b-8e91-7466eec0a7f4':
            print(prefix, the_type, value)

        if prefix == 'data' and the_type == 'map_key':            
            if card != {}:
                price_history = {'cardkingdom': card['prices']}
                dumped_json = json.dumps(price_history)

                '''
                import json
                m = {'id': 2, 'name': 'hussain'}
                n = json.dumps(m)
                o = json.loads(n)
                print(o['id'], o['name'])
                '''

            card = {}
            card['prices'] = []
            card['uuid'] = value

        if the_type == 'string' and prefix != 'meta.version' and prefix != 'meta.date':
            card['currency'] = value
        if the_type == 'number':
            if prefix.find("cardkingdom") != -1 and prefix.find("retail") != -1:
                prefix_tokens = prefix.split('.')
                token_len = len(prefix_tokens)
                card['prices'].append({prefix_tokens[token_len - 1]:str(value)})

        if count > 3000:
            count = 0  
            # break
        count = count + 1