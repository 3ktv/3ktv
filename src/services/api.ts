export interface ProgramItem {
  id: string;
  date: string;
  time: string;
  host: string;
  title: string;
  extra: string;
  description?: string;
  category?: string;
}

export interface ChannelItem {
  title: string;
  category: string;
  description: string;
}

const API_KEY = 'AIzaSyBZ5lMMi6aWprqFgBz551HqXkx6TGFV0RY';
const SPREADSHEET_ID = '1595O9QndfjpbpElrowXTDvSqeF234FJ9p8ulZfWRLTY';
const SHEET_NAME = 'ROZKLAD';

export const fetchAndStoreSchedule = async (): Promise<ProgramItem[]> => {
  try {
    const [scheduleResponse, descriptionsResponse] = await Promise.all([
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
      ),
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/OPIS_PROGRAMOW?key=${API_KEY}`
      )
    ]);

    const [scheduleData, descriptionsData] = await Promise.all([
      scheduleResponse.json(),
      descriptionsResponse.json()
    ]);

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
          // Row format: [Kiedy, Godzina, Kto, Program, Kolumna nr 1]
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
            extra: row[4] || 'FALSE',
            description: descInfo?.desc || '',
            category: descInfo?.cat || ''
          };
        })
        .filter((item) => item.title !== 'Untitled' || item.date !== '');

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

export const getStoredSchedule = (): ProgramItem[] => {
  try {
    const data = localStorage.getItem('program_schedule');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse schedule from local storage', e);
    return [];
  }
};

export const getProgramById = (id: string): ProgramItem | undefined => {
  const schedule = getStoredSchedule();
  return schedule.find((p) => p.id === id);
};
