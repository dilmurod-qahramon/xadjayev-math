const LEAD_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyN3sj5-g4rxiDssRk8yuLiDRCOO7IWZoazX0o2v4gQKRZzhz8XlTJCaeicmxGKZQtHgw/exec';

interface LeadData {
  phone: string;
  comments?: string;
}

export const submitLead = async (data: LeadData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(LEAD_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone.trim(),
        comments: data.comments?.trim() || '',
      }),
    });

    // With no-cors mode, we can't read the response, but if no error was thrown, assume success
    return { success: true };
  } catch (error) {
    console.error('Failed to submit lead:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit lead' 
    };
  }
};
