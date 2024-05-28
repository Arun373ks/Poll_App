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
        options_split = block[1].strip().split("|")
        options_stripped = []
        for option in options_split:
            option_stripped=option.strip()
            options_stripped.append(option_stripped)
        O = options_stripped
        votes_split = block[2].strip().split("|")
        votes_stripped = []
        for vote in votes_split:
            vote_stripped = vote.strip()
            vote_int = int(vote_stripped)
            votes_stripped.append(vote_int)
        V = votes_stripped   
        tags_split = block[3].strip().split("|")
        tags_stripped = []
        for tag in tags_split:
            tag_stripped = tag.strip()
            tags_stripped.append(tag_stripped)
        T = tags_stripped
        question_dict = {
            "Question": Q,
            "OptionVote": dict(zip(O, V)),
            "Tags": T,
        }
        poll_data.append(question_dict)
    return poll_data

def view_poll(polls_data, poll_number):
    if poll_number < 1 or poll_number > len(polls_data):
        print("Invalid poll number.")
        return

    poll = polls_data[poll_number-1 ]
    print(poll["Question"])
    options = poll["OptionVote"]
    for option, votes in options.items():
        print(f"* {option} {votes}")
    
    print("Tags", ",".join(poll["Tags"]))

polls_data = parse_poll_data()

poll_number = 1

view_poll(polls_data, poll_number)