**Prerequisites:**

* You'll need Node.js and npm (or yarn) installed on your system. You can check their installation by running `node -v` and `npm -v` (or `yarn -v`) in your terminal. If they are not installed, download them from the official websites:
    * Node.js: [https://nodejs.org/en](https://nodejs.org/en)
    * npm comes bundled with Node.js installation
    * yarn: [https://yarnpkg.com/](https://yarnpkg.com/) (optional alternative to npm)

**Steps:**

1. **Clone the Repository:**

   Open your terminal and navigate to the directory where you want to clone the Next.js project.  Use the `git clone` command followed by the URL of the GitHub repository. For example, to clone a repository named `kiron-website` from user `zeon-studio-portal`, you would run:

   ```bash
   git clone https://github.com/zeon-studio-portal/kiron-website.git
   ```

2. **Install Dependencies:**

   Navigate into the cloned directory using `cd`:

   ```bash
   cd kiron-website
   ```

   Next, install the project's dependencies using npm or yarn. The command depends on which package manager the project uses. Check the project's README file (if available) for specific instructions. Typically, you'll see one of these commands:

   * npm:
      ```bash
      npm install
      ```
   * yarn:
      ```bash
      yarn install
      ```

   This command downloads all the necessary libraries the project needs to run.

3. **Environment Variable:**

   Environment variable are already in the project, file name - `.env.local`, it's a hidden file contains `NEXT_PUBLIC_KIRON_API` and `NEXT_PUBLIC_KIRON_SECRET_KEY`. Change them according to your need.

4. **Start the Development Server:**

   Once the dependencies are installed, start the development server using the following command (again, refer to the README if unsure):

   * npm:
      ```bash
      npm run dev
      ```
   * yarn:
      ```bash
      yarn dev
      ```

   This will start a local development server, usually running at `http://localhost:3000` by default (you can check the exact port in the terminal output). You can now access your Next.js application in your web browser.
