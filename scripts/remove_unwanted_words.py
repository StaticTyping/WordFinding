import os

input_path = "C:\\Users\\User\\Documents\\StaticTypingProjects\\1_WordFinding\\data\\words.txt"
output_path = "C:\\Users\\User\\Documents\\StaticTypingProjects\\1_WordFinding\\data\\words_corrected.txt"

to_keep = []

for word in open(input_path, "r"):
    word = word.strip()
    if word.isalpha() and word.islower():
        to_keep.append(word)

try:
    os.remove(output_path)
except:
    pass
with open(output_path, "w+") as out:
    for word in to_keep:
        out.write(word + "\n")


    