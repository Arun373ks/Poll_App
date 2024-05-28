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
        options_stripped = [option.strip() for option in options_split]
        O = options_stripped
        votes_split = block[2].strip().split("|")
        votes_stripped = [int(vote.strip()) for vote in votes_split]
        V = votes_stripped
        tags_split = block[3].strip().split("|")
        tags_stripped = [tag.strip() for tag in tags_split]
        T = tags_stripped
        question_dict = {
            "Question": Q,
            "OptionVote": dict(zip(O, V)),
            "Tags": T,
        }
        poll_data.append(question_dict)
    return poll_data

def update_poll(polls_data, poll_number, option_name):
    if poll_number < 1 or poll_number > len(polls_data):
        print("Invalid poll number.")
        return polls_data

    poll = polls_data[poll_number - 1]
    option_votes = poll["OptionVote"]
    if option_name in option_votes:
        option_votes[option_name] += 1
    else:
        print("Invalid option name.")

    return polls_data

def view_poll(polls_data, poll_number):
    if poll_number < 1 or poll_number > len(polls_data):
        print("Invalid poll number.")
        return

    poll = polls_data[poll_number-1]
    print(poll["Question"])
    options = poll["OptionVote"]
    for option, votes in options.items():
        print(f"* {option}: {votes}")
    
    print("Tags:", ",".join(poll["Tags"]))

def New_file(poll_data,updated_polldata):
    with open(updated_polldata,"w")as file:
        file.write("Question::Options::Votes::Tags\n")
        for poll in poll_data:
            Question=poll["Question"]
            Options="|".join(poll["OptionVote"].keys())
            Vote_Values=poll["OptionVote"].values()
            Vote_strings=[]
            for V in Vote_Values:
                Vote_strings.append(str(V))
                Votes="|".join(Vote_strings)    
            Tags="|".join(poll["Tags"])
            file.write(f"{Question}::{Options}::{Votes}::{Tags}\n")

polls_data = parse_poll_data()

poll_number = 1
view_poll(polls_data, poll_number) 

option_name = "Yes"
update_poll(polls_data, poll_number, option_name)
view_poll(polls_data, poll_number)

New_file(polls_data, "updated_polldata.fps")
