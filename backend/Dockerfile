# Step 1: Start from an official Python base image.
# We use a "slim" version which is smaller and more efficient.
FROM python:3.11-slim

# Step 2: Set the working directory inside the container.
# This is where our application code will live.
WORKDIR /code

# Step 3: Copy the dependencies file into the container.
COPY ./requirements.txt /code/requirements.txt

# Step 4: Install the Python libraries listed in requirements.txt.
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Step 5: Copy our application's source code into the container.
COPY ./app /code/app

# Step 6: Inform Docker that the container will listen on port 8000 at runtime.
EXPOSE 8000

# Step 7: The command to run when the container starts.
# This starts our FastAPI server. The "--host 0.0.0.0" is crucial
# to make the server accessible from outside the container.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]