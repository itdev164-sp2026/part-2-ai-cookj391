import { test, expect, type Page } from "@playwright/test";

// Read test credentials from environment variables.
// Set these in a .env.local file or your CI environment:
//   TEST_USER_EMAIL=your@email.com
//   TEST_USER_PASSWORD=yourpassword
const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

// ---------------------------------------------------------------------------
// Helper: fill and submit the sign-in form
// ---------------------------------------------------------------------------
async function signIn(page: Page, email: string, password: string) {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
test.describe("Authentication", () => {
  // -------------------------------------------------------------------------
  // 1. LOGIN PAGE VISIBLE
  // -------------------------------------------------------------------------
  test(
    "LOGIN PAGE VISIBLE: navigating to /login renders the email input, " +
      "password input, and sign-in submit button",
    async ({ page }) => {
      await page.goto("/login");

      // The form should be rendered — check each interactive element.
      await expect(
        page.getByLabel("Email"),
        "Email input should be visible on the login page"
      ).toBeVisible();

      await expect(
        page.getByLabel("Password"),
        "Password input should be visible on the login page"
      ).toBeVisible();

      await expect(
        page.getByRole("button", { name: "Sign In" }),
        "Sign In submit button should be visible on the login page"
      ).toBeVisible();
    }
  );

  // -------------------------------------------------------------------------
  // 2. REDIRECT AFTER LOGIN
  // -------------------------------------------------------------------------
  test(
    "REDIRECT AFTER LOGIN: a successful login with valid credentials " +
      "redirects the user to the dashboard (/) page",
    async ({ page }) => {
      // Skip if credentials are not provided in the environment.
      if (!TEST_EMAIL || !TEST_PASSWORD) {
        test.skip(
          true,
          "Skipping: TEST_USER_EMAIL and TEST_USER_PASSWORD environment " +
            "variables are not set. Provide them to run credentialed tests."
        );
        return; // Appease TypeScript — test.skip throws, but this is defensive.
      }

      await page.goto("/login");
      await signIn(page, TEST_EMAIL, TEST_PASSWORD);

      // After a successful sign-in the app calls router.push('/'), so wait for
      // the URL to settle on the root dashboard page.
      await expect(
        page,
        "Browser should be redirected to the dashboard (/) after login"
      ).toHaveURL("/");
    }
  );

  // -------------------------------------------------------------------------
  // 3. SIDEBAR NAVIGATION
  // -------------------------------------------------------------------------
  test(
    "SIDEBAR NAVIGATION: after login, the sidebar shows Overview, " +
      "Projects, and Settings navigation links",
    async ({ page }) => {
      // Skip if credentials are not provided in the environment.
      if (!TEST_EMAIL || !TEST_PASSWORD) {
        test.skip(
          true,
          "Skipping: TEST_USER_EMAIL and TEST_USER_PASSWORD environment " +
            "variables are not set. Provide them to run credentialed tests."
        );
        return;
      }

      await page.goto("/login");
      await signIn(page, TEST_EMAIL, TEST_PASSWORD);

      // Wait for the post-login redirect and for Next.js to finish
      // hydrating the client components (sidebar uses "use client").
      await expect(page).toHaveURL("/");
      await page.waitForLoadState("domcontentloaded");

      // DashboardChrome renders the current page title in a breadcrumb as:
      //   <span role="link" aria-disabled="true">Overview</span>
      // This gives Playwright two "Overview" role=link elements to choose from
      // (sidebar <a> + breadcrumb <span>), causing a strict-mode violation.
      //
      // Fix: pass { disabled: false } to getByRole so Playwright's ARIA matching
      // excludes the aria-disabled="true" breadcrumb span and returns only the
      // enabled sidebar <a> element. The sidebar links have no disabled state.
      await expect(
        page.getByRole("link", { name: "Overview", disabled: false }),
        '"Overview" sidebar link should be visible after login'
      ).toBeVisible();

      await expect(
        page.getByRole("link", { name: "Projects", disabled: false }),
        '"Projects" sidebar link should be visible after login'
      ).toBeVisible();

      await expect(
        page.getByRole("link", { name: "Settings", disabled: false }),
        '"Settings" sidebar link should be visible after login'
      ).toBeVisible();
    }
  );
});
