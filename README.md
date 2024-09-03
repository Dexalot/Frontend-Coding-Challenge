# Vue.js Token Balance Viewer

This project is a Vue.js application that fetches and displays token balances from various networks. The application allows users to select a network and view the corresponding token balances. If there is an error while fetching the balance, an error message is displayed directly in the table cell for that token.

## Getting Started

To get started with this project, ensure you have the following prerequisites installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn** (v1.22 or higher)

## Installation

Follow these steps to install and set up the project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install Dependencies:**

    ```bash
   npm install
   npm run serve
   ```
3. **Usage:**

- Select a Network:
Use the dropdown menu to select a network. The application will automatically fetch the corresponding tokens for the selected network.

- View Token Balances:
Once the tokens are fetched, the balances are displayed in a table. If there is an error while fetching a balance, an error message will be shown in place of the balance.

- Error Handling:
If a balance cannot be fetched, an error message ("Error fetching balance") will be displayed directly in the table cell for that token.

4. **Considerations and Trade-offs:**

- Incremental Updates for Better User Experience: The application updates the token balances incrementally to provide a better user experience. Each token balance is fetched individually, and if an error occurs for a particular token, it is handled gracefully without affecting the rest of the tokens.

- Error Messages Displayed Inline: Instead of showing a generic error message for all tokens, the application displays an error message inline for each token that fails to fetch its balance. This approach allows the user to see which specific tokens have issues.

- Responsiveness: The table and dropdown are made responsive using CSS media queries to ensure a good user experience across different screen sizes.

- Consideration for API Rate Limits: The application handles balance fetching in a loop, which might be subject to API rate limits. For production use, consider implementing a backoff strategy or batching requests to comply with rate limits.

- Trade-off Between Real-time Updates and API Performance: Fetching token balances in real-time ensures users always have the most up-to-date information, but it can be resource-intensive and may impact performance. Caching or debouncing the requests might be necessary for high-traffic scenarios.

5. **Technologies Used:**

    - Vue.js 3: The progressive JavaScript framework used for building the user interface.

    - Vuex: State management pattern + library for Vue.js applications.

    - Axios: Promise-based HTTP client for making API requests.

    - Ethers.js: A library for interacting with the Ethereum blockchain.

    - TypeScript: A statically typed superset of JavaScript.

    - CSS3: For responsive styling and layout.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

## Contributing
This `README.md` is now fully formatted in Markdown and ready for you to copy and paste into your project.
