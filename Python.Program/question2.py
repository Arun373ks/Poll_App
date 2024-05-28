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
        options_split = block[1].strip().split("|")
        options_stripped = [option.strip() for option in options_split]
        O = options_stripped
        votes_split=block[2].strip().split("|")
        votes_stripped = [vote.strip() for vote in votes_split]
        V = votes_stripped
        tags_split=block[3].strip().split("|")
        tags_stripped = [tag.strip() for tag in tags_split]
        T=tags_stripped
        
        question_dict = {
            "Question": Q,
            "OptionVote": dict(zip(O, V)),
            "Tags": T,
        }
        poll_data.append(question_dict)
    
    list_of_tag = ['phones','apple' ] 
    
    seen_questions = set()  
    filtered_polls = []
    
    for question_dict in poll_data:
        if question_dict['Question'] not in seen_questions:
            seen_questions.add(question_dict['Question']) 
        if set(list_of_tag) & set(question_dict['Tags']):
                filtered_polls.append(question_dict)
    
    return filtered_polls

resulting_filtered_polls = parse_poll_data()
print("resulting_poll_data:")
pprint(resulting_filtered_polls)
