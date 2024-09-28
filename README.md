This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# BogningRodney-exo_backend_ulife.ai


## src directory architecture

   This folder contains the main elements of our application. Each of the folders it contains represents a layer of our architecture. 
   - `application` - **Application Layer** - holds use cases and interfaces for repositories and services
   - `entities`  - **Entities Layer** - holds models and custom errors
   - `infrastructure` - **Infrastructure Layer** - holds implementations of repositories and services, and pulls in the interfaces from `application`
   - `interface-adapter`  - **Interface Adapters Layer** - holds controllers that serve as an entry point to the system (used in Frameworks & Drivers layer to interact with the system)

### Layers explenation 
- **Application**: where the business logic lives. Sometimes called _core_. This layer defines the Use Cases and interfaces for the services and repositories.
  - **Use Cases**:
    - Represent individual operations, like "Create item" or "Sign In".
    - Accept pre-validated input (from controllers) and _handle authorization checks_.
    - Use _Repositories_ and _Services_ to access data sources and communicate with external systems.

- **Entities**: where the  Models and Errors are defined.
  - **Models**:
    - Define "domain" data shapes with plain JavaScript, without using "database" technologies.
    - Models are not always tied to the database - sending emails require an external email service, not a database, but we still need to have a data shape that will help other layers communicate "sending an email".
    - Models also define their own validation rules, which are called "Enterprise Business Rules". Rules that don't usually change, or are least likely to change when something _external_ changes (page navigation, security, etc...). An example is a `User` model that defines a username field that must be _at least 6 characters long and not include special characters_.
  - **Errors**:
    - We want our own errors because we don't want to be bubbling up database-specific errors, or any type of errors that are specific to a library or framework.
    - We `catch` errors that are coming from other libraries and convert those errors to our own errors.
    - That's how we can keep our _core_ independent of any frameworks, libraries, and technologies - one of the most important aspects of Clean Architecture.

- **Infrastructure**: where Repositories and Services are being defined.
  - This layer pulls in the interfaces of repositories and services from the _Application Layer_ and implements them in their own classes.
  - _Repositories_ are how we implement the database operations. They are classes that expose methods that perform a single database operation - like `getTodo`, or `createTodo`, or `updateTodo`. This means that we use the database library / driver in these classes only. They don't perform any data validation, just execute queries and mutations against the database and either throw our custom defined _Errors_ or return results.
  - _Services_ are shared services that are being used across the application - like an authentication service, or email service, or implement external systems like Stripe (create payments, validate receipts etc...). These services also use and depend on other frameworks and libraries. That's why their implementation is kept here alongside the repositories.


- **Interface Adapters**: defines _Controllers_:
  - Controllers perform **authentication checks** and **input validation** before passing the input to the specific use cases.
  - Controllers _orchestrate_ Use Cases. They don't implement any logic, but define the whole operations using use cases.
  - Errors from deeper layers are bubbled up and being handled where controllers are being used.
  - Controllers use _Presenters_ to convert the data to a UI-friendly format just before returning it to the "consumer". This helps us ship less JavaScript to the client (logic and libraries to convert the data), helps prevent leaking any sensitive properties, like emails or hashed passwords, and also helps us slim down the amount of data we're sending back to the client.