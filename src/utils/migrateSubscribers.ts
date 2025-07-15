import { supabase } from '@/lib/supabase';

/**
 * Migrates subscriber emails from localStorage to Supabase
 * @returns {Promise<{migrated: number, errors: number}>} Number of migrated and error emails
 */
export async function migrateSubscribersToSupabase(): Promise<{ migrated: number; errors: number }> {
  // Initialize counters
  let migrated = 0;
  let errors = 0;
  
  try {
    // Get all localStorage keys
    const allKeys = Object.keys(localStorage);
    
    // Filter keys related to subscribers (stored with email_ prefix)
    const subscriberKeys = allKeys.filter(key => key.startsWith('email_'));
    
    if (subscriberKeys.length === 0) {
      console.log('No subscribers found in localStorage to migrate');
      return { migrated, errors };
    }
    
    // Process each subscriber
    for (const key of subscriberKeys) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        const email = key.replace('email_', '');
        const source = data.source || 'unknown';
        
        // Insert into Supabase with conflict handling (avoid duplicates)
        const { error } = await supabase
          .from('app_756f9e3ca9454cb782f1af778d02d691_subscribers')
          .upsert({ 
            email, 
            source,
            created_at: data.timestamp ? new Date(data.timestamp) : new Date() 
          }, { 
            onConflict: 'email' 
          });
        
        if (error) {
          console.error(`Error migrating ${email}:`, error.message);
          errors++;
        } else {
          console.log(`Successfully migrated ${email}`);
          migrated++;
        }
      } catch (e) {
        console.error('Error processing subscriber:', e);
        errors++;
      }
    }
    
    console.log(`Migration complete. Migrated: ${migrated}, Errors: ${errors}`);
    return { migrated, errors };
  } catch (e) {
    console.error('Migration failed:', e);
    return { migrated, errors };
  }
}

/**
 * Checks if subscribers exist in localStorage
 * @returns {boolean} Whether subscribers exist in localStorage
 */
export function hasLocalSubscribers(): boolean {
  const allKeys = Object.keys(localStorage);
  return allKeys.some(key => key.startsWith('email_'));
}

/**
 * Gets count of subscribers in localStorage
 * @returns {number} Count of subscribers
 */
export function getLocalSubscribersCount(): number {
  const allKeys = Object.keys(localStorage);
  return allKeys.filter(key => key.startsWith('email_')).length;
}