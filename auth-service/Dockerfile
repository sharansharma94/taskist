# Use an official Deno runtime as a parent image
FROM denoland/deno

# Set the working directory in the container
WORKDIR /app

# Copy the application code
COPY . .

RUN deno install

# Install dependencies (if you have a deno.json file)
RUN deno cache src/app.ts

# Expose the port
EXPOSE 3000

# Run the command to start the development server
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--allow-sys","--watch", "src/app.ts"]
