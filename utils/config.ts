import dotenv from 'dotenv';
dotenv.config();

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Missing environment variable : ${name}`);
    }
    return value;
}

export const config = {
    baseUrl: getEnvVar('BASE_URL'),
    testUser: getEnvVar('TEST_USER'),
    testPassword: getEnvVar('TEST_PASSWORD'),
};
