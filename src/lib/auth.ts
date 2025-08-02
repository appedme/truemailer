import { stackServerApp } from '../stack';
import { syncUserFromStackAuth } from './db/queries';

export async function getCurrentUser() {
  const user = await stackServerApp.getUser();
  
  if (!user) {
    return null;
  }

  // Sync user with our database
  await syncUserFromStackAuth({
    id: user.id,
    primaryEmail: user.primaryEmail!,
    displayName: user.displayName || undefined,
    profileImageUrl: user.profileImageUrl || undefined,
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

export async function getServerSession() {
  return await stackServerApp.getUser();
}