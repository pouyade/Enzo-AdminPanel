# Enzo-AdminPanel

Enzo-AdminPanel is a modern, responsive admin panel built with **Vue.js** and **Tailwind CSS**, designed to streamline app management. This frontend web panel offers a robust set of tools to manage various aspects of your application, from user administration to subscription plans and payment systems. It includes a **Dockerfile** for easy deployment and is designed to integrate seamlessly with a backend (link to be added).

Whether you're developing a SaaS platform, mobile app dashboard, or any app requiring administrative oversight, Enzo-AdminPanel provides a flexible and customizable solution to accelerate your development.

## Features

- **App Settings**: Configure and manage application settings dynamically.
- **Update Management**: Handle app updates and version control efficiently.
- **User Management**: Administer user accounts, roles, and permissions.
- **Support System**: Manage customer support tickets and communications.
- **Bug and Crash Logs**: Monitor and analyze application errors and crashes.
- **Plan System**: Create and manage subscription plans for users.
- **Payment System**: Integrate and manage payment processing for subscriptions.
- **Voucher System**: Generate and manage discount codes or vouchers.
- **Text Management**: Dynamically manage in-app text for localization or customization.

## Prerequisites

To run Enzo-AdminPanel locally or via Docker, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Docker** (optional, for containerized deployment)
- **Git**

## Installation

### Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pouyade/Enzo-AdminPanel.git
   cd Enzo-AdminPanel
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run serve
   ```
   The app will be available at `http://localhost:8080` (or the port specified in your Vue config).

### Docker Setup

1. **Build the Docker Image**:
   ```bash
   docker build -t enzo-admin-panel .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 8080:8080 enzo-admin-panel
   ```
   Access the panel at `http://localhost:8080`.

## Backend Integration

This frontend panel is designed to work with a backend API (link to be provided). Once the backend repository is available, update this section with the link and instructions for connecting the frontend to the backend.

## Contributing

Contributions are welcome! To contribute to Enzo-AdminPanel:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, reach out to [PouyaDe](https://github.com/pouyade) on GitHub.