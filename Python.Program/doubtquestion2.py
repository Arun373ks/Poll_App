from pprint import pprint

def parse_poll_data():
    print("Reading file...")
    with open("polldata.fps", "r") as file:
        lines = file.readlines()
    print("File read successfully.")
    
    poll_data = []
    for line in lines:
        block = line.strip().split("::")
        Q = block[0].strip()
        O = block[1].strip().split("|")
        V = block[2].strip().split("|")
        T = [tag.strip() for tag in block[3].strip().split("|")]  
        question_dict = {
            "Question": Q,
            "OptionVote": dict(zip(O, V)),
            "Tags": T,
        }
        print(question_dict)
        poll_data.append(question_dict)
    
    list_of_tag = ['phones', 'apple'] 
    filtered_polls = []
    for question_dict in poll_data: 
      for tag in question_dict['Tags']:
       if tag in  list_of_tag: 
            filtered_polls.append(question_dict)
    print(filtered_polls)
    return filtered_polls

resulting_filtered_polls = parse_poll_data()
print("resulting_poll_data:")
pprint(resulting_filtered_polls)