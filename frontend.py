#step1: setup upload pdf functionality
import streamlit as st

# Page configuration
st.set_page_config(page_title="Legal Chatbot")

# Sidebar
with st.sidebar:
    st.header("Upload PDF Document")
    uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

# Main title
st.title("Legal Assistant Bot 🤖")

# PDF upload status
if uploaded_file is not None:
    st.success("File uploaded successfully!")
    st.write("File name:", uploaded_file.name)

# -----------------------------
# Chatbot Skeleton
# -----------------------------

# Store chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display previous messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
prompt = st.chat_input("Ask a question about your legal document...")

if prompt:
    # Display user message
    st.session_state.messages.append(
        {"role": "user", "content": prompt}
    )

    with st.chat_message("user"):
        st.markdown(prompt)

    # Placeholder bot response
    if uploaded_file is not None:
     response = answer_from_pdf(uploaded_file, prompt)
else:
    response = general_chat(prompt)

    st.session_state.messages.append(
        {"role": "assistant", "content": response}
    )

    with st.chat_message("assistant"):
        st.markdown(response)