from pprint import pprint
lines=[]
def parse_poll_data():
        print("Reading file...")
        with open("polldata.fps", "r") as file:
              lines=file.readlines()
        print(lines)
        print("File read successfully.")
        poll_data=[]
        for line in lines[1:]:
           block=line.strip().split("::")
           Q=block[0].strip()
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
                    "Question":Q,
                     "OptionVote":dict(zip(O,V)),
                     "Tags":T,
                    }
           print(question_dict)
           poll_data.append(question_dict)
        print(poll_data)
        return poll_data
resulting_poll_data = parse_poll_data()
print("resulting_poll_data",resulting_poll_data )




               