from pprint import pprint

def parse_poll_data():
    print("Reading file...")
    with open("polldata.fps", "r") as file:
        lines = file.readlines()
    print(lines)
    print("File read successfully.")
    poll_data = []
    for line in lines[1:]:
        block = line.strip().split("::")
        Q = block[0].strip()
        O = [option.strip() for option in block[1].strip().split("|")]
        V = [vote.strip() for vote in block[2].strip().split("|")]
        T = [tag.strip() for tag in block[3].strip().split("|")]
        option_vote = {option: vote for option, vote in zip(O, V)}
        question_dict = {
            "Question": Q,
            "OptionVote": option_vote,
            "Tags": T
        }
        print(question_dict)
        poll_data.append(question_dict)
    print(poll_data)
    return poll_data

resulting_poll_data = parse_poll_data()
print("resulting_poll_data", resulting_poll_data)
