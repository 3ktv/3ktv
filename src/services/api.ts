export interface ReferralItem {
  id: string;
  name: string;
  url: string;
}

export interface ProgramItem {
  id: string;
  date: string;
  time: string;
  host: string;
  title: string;
  status: string;
  description?: string;
  category?: string;
  details?: string;
}

export interface ChannelItem {
  title: string;
  category: string;
  description: string;
}

export interface CrewMember {
  id: string;
  name: string;
  description: string;
  image: string;
  channel?: string;
}

const API_KEY = 'AIzaSyBZ5lMMi6aWprqFgBz551HqXkx6TGFV0RY';
const SPREADSHEET_ID = '1595O9QndfjpbpElrowXTDvSqeF234FJ9p8ulZfWRLTY';
const SHEET_NAME = 'ROZKLAD';

export const fetchAndStoreSchedule = async (): Promise<ProgramItem[]> => {
  try {
    const [scheduleResponse, descriptionsResponse, referralsResponse, crewResponse] = await Promise.all([
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
      ),
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/OPIS_PROGRAMOW?key=${API_KEY}`
      ),
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/REFERALS?key=${API_KEY}`
      ),
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/CREW?key=${API_KEY}`
      )
    ]);

    const [scheduleData, descriptionsData, referralsData, crewData] = await Promise.all([
      scheduleResponse.json(),
      descriptionsResponse.json(),
      referralsResponse.json(),
      crewResponse.json()
    ]);

    // Parse Referrals
    if (referralsData.values && referralsData.values.length > 0) {
      // Assuming headers might or might not be there. Use heuristic.
      // If first row looks like header "Instagram", "http"..., it might be data if it's not "Name", "Url".
      // Let's assume no header or check. The user data showed "Instagram" at row 1.
      // Wait, snippet showed: [ ["Instagram", "https://..."] ] which implies no explicit "Name", "Url" header row in the snippet I saw? 
      // Actually the snippet output:
      // values: [ [ "Instagram", "https..." ] ]
      // Usually these sheets have headers. Let's assume if it is NOT a valid URL in col 1, it's a header?
      // Or just assume row 0 is data if it looks like data.
      // Actually, standard practice is Row 1 = Headers.
      // Let's check the snippet again... Step 278. 
      // It returned `values: [ ["Instagram", "https..."] ]`. 
      // Wait, usually the Range is A1:Z1000. 
      // If the sheet HAS headers, they should be in row 0. 
      // `["Instagram", "https://..."]` looks like DATA.
      // If there was a header "Platforma", "Link", it would be first.
      // I'll be safe: Filter for valid URLs in column 1.

      const referrals: ReferralItem[] = referralsData.values
        .map((row: string[], index: number) => ({
          id: `ref-${index}`,
          name: row[0] || 'Unknown',
          url: row[1] || ''
        }))
        .filter((item: ReferralItem) => item.url.startsWith('http'));

      localStorage.setItem('program_referrals', JSON.stringify(referrals));
    }

    // Parse Crew
    if (crewData.values && crewData.values.length > 0) {
      // First row is header
      const crew: CrewMember[] = crewData.values.slice(1)
        .map((row: string[], index: number) => ({
          id: `crew-${index}`,
          name: row[0] || 'Unknown',
          description: row[1] || '',
          image: row[2] || '',
          channel: row[3] || ''
        }))
        .filter((item: CrewMember) => item.name);

      localStorage.setItem('program_crew', JSON.stringify(crew));
    }

    // Parse descriptions/channels
    // OPIS_PROGRAMOW: [Nazwa, Kategoria, Opis]
    //                  0      1          2
    const descriptionMap = new Map<string, { desc: string; cat: string }>();
    const channels: ChannelItem[] = [];

    if (descriptionsData.values && descriptionsData.values.length > 1) {
       descriptionsData.values.slice(1).forEach((row: string[]) => {
         const title = row[0] ? row[0].trim() : '';
         const category = row[1] || '';
         const description = row[2] || '';
         
         if (title) {
           descriptionMap.set(title, { desc: description, cat: category });
           channels.push({ title, category, description });
         }
       });
       
       localStorage.setItem('program_channels', JSON.stringify(channels));
    }

    if (scheduleData.values && scheduleData.values.length > 1) {
      // Skip header row
      const rows = scheduleData.values.slice(1);
      const parsedData: ProgramItem[] = rows
        .map((row: string[], index: number) => {
          // Row format: [Kiedy, Godzina, Kto, Program, Status]
          //              0       1        2    3        4
          const title = row[3] || 'Untitled';
          // Generate a URL-friendly ID
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
            
          const id = `${slug}-${index}`;
          const descInfo = descriptionMap.get(title.trim());

          return {
            id,
            date: row[0] || '',
            time: row[1] || '',
            host: row[2] || '',
            title: title,
            status: row[5] || 'Unknown',
            description: descInfo?.desc || '',
            category: descInfo?.cat || '',
            details: row[4] || ''
          };
        })
        .filter((item: ProgramItem) => item.title !== 'Untitled' || item.date !== '');


      localStorage.setItem('program_schedule', JSON.stringify(parsedData));
      // Dispatch a custom event so components can react immediately if needed
      window.dispatchEvent(new Event('scheduleUpdated'));
      
      return parsedData;
    }
  } catch (error) {
    console.error('Failed to fetch schedule', error);
  }
  return [];
};

export const getStoredChannels = (): ChannelItem[] => {
  try {
    const data = localStorage.getItem('program_channels');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse channels from local storage', e);
    return [];
  }
};

export const getStoredCrew = (): CrewMember[] => {
  try {
    const data = localStorage.getItem('program_crew');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse crew from local storage', e);
    return [];
  }
};

export const getStoredReferrals = (): ReferralItem[] => {
  try {
    const data = localStorage.getItem('program_referrals');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse referrals from local storage', e);
    return [];
  }
};

export const getStoredSchedule = (): ProgramItem[] => {
  try {
    const data = localStorage.getItem('program_schedule');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse schedule from local storage', e);
    return [];
  }
};

export const fetchKickChannelData = async (slug: string): Promise<string | null> => {
  try {
    // Note: This request might fail due to CORS or Cloudflare protection if called directly from the browser.
    // In a production environment, this should be proxied through a backend.
    const response = await fetch(`https://kick.com/api/v1/channels/${slug}`);
    if (!response.ok) {
       throw new Error(`Kick API error: ${response.status}`);
    }
    const data = await response.json();
    return data?.livestream?.session_title || null;
  } catch (error) {
    console.warn('Failed to fetch Kick channel data', error);
    return null;
  }
};

export const getProgramById = (id: string): ProgramItem | undefined => {
  const schedule = getStoredSchedule();
  return schedule.find((p) => p.id === id);
};
