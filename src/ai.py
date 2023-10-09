import spacy

# Load the spaCy English model
nlp = spacy.load("en_core_web_sm")

def extract_text_from_transcript(transcript_file):
    with open(transcript_file, "r", encoding="utf-8") as file:
        transcript_text = file.read()
    return transcript_text

def generate_pointers(transcript_text, num_pointers=5):
    # Preprocess the transcript using spaCy
    doc = nlp(transcript_text)

    # Calculate the importance score for each sentence
    sentence_scores = {}
    for sentence in doc.sents:
        sentence_text = sentence.text.lower()  # Convert to lowercase for analysis
        sentence_score = 0

        # You can define custom rules or use NLP features to calculate sentence importance.
        # For example, you can check for keywords, entities, or other patterns.

        # Example: Calculate score based on keyword presence (customize as needed)
        keywords = ["important", "key point", "highlight"]
        for keyword in keywords:
            if keyword in sentence_text:
                sentence_score += 1

        sentence_scores[sentence] = sentence_score

    # Sort sentences by their importance scores
    sorted_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)

    # Extract the top N sentences as pointers
    pointers = [sentence[0].text.strip() for sentence in sorted_sentences[:num_pointers]]

    return pointers

if __name__ == "__main__":
    print("Video Transcript Pointers")

    # Interactive CLI input
    transcript_file = input("Enter the path to the transcript file: ")
    num_pointers = int(input("Enter the number of pointers to generate: "))

    transcript_text = extract_text_from_transcript(transcript_file)
    pointers = generate_pointers(transcript_text, num_pointers)

    # Print the pointers
    print("\nGenerated Pointers:")
    for i, pointer in enumerate(pointers, start=1):
        print(f"{i}. {pointer}")
