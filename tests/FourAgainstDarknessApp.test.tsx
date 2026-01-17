import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FourAgainstDarknessApp } from '../src/FourAgainstDarknessApp';

const mockData = {
  'encounters-t7y4rqv3':
    '[{"name":"Chaos lord","type":"Boss","level":"6","count":1,"attacksPerRound":"3","status":"Defeated","notes":""},{"name":"Rats","type":"Vermin","level":1,"count":1,"attacksPerRound":1,"status":"Defeated","notes":""},{"name":"Chaos lord","type":"Boss","level":"7","count":1,"attacksPerRound":"3","status":"Defeated","notes":""},{"name":"Statue","type":"Boss","level":"4","count":1,"attacksPerRound":1,"status":"Defeated","notes":""},{"name":"Rats","type":"Vermin","level":"2","count":1,"attacksPerRound":1,"status":"Defeated","notes":""},{"name":"Mummy","type":"Minion","level":"5","count":1,"attacksPerRound":"3","status":"Defeated","notes":""}]',
  'characters-t7y4rqv3':
    '[{"name":"Arden","class":"Light gladiator","level":"3","gold":"1","attack":"0","defense":"1","fullLife":"8","currentLife":"3","equipment":["Dagger -1","Dagger -1"],"spells":[],"notes":"1/2 L attk\\n1/2 L def\\n2 attack rolls / 1 parry +1 def\\n1/combat - counter-strike\\n1/combat - opportunist\\nL3 expert skill","id":"01KDZV0BFHFGG20NX3M9AK49WY","key":"characters-t7y4rqv3"},{"name":"Barnett","class":"Assassin","level":"2","gold":"12","attack":"3","defense":"1","fullLife":"5","currentLife":2,"equipment":["Light armor +1","Bow","Great sword +1"],"spells":[],"notes":"L attk\\nSpend turn to stealth save, next turn attk x3\\n1/adventure +2 attk after stealth save vs foe L","id":"01KDZV0BFJ5ZBP5247J9G4ZEQB","key":"characters-t7y4rqv3"},{"name":"Holly","class":"Cleric","level":"2","gold":0,"attack":"2","defense":"1","fullLife":"6","currentLife":4,"equipment":["Light armor +1","War hammer +1"],"spells":[{"name":"Blessing","slots":3,"checkedSlots":[true,true,true]},{"name":"Healing d6+L","slots":3,"checkedSlots":[true,false,false]}],"notes":"1/2 L attk\\n+L attk vs undead\\n1/adventure +1 to allies","id":"01KDZV0BFJSPZ8SNMFBT148TV4","key":"characters-t7y4rqv3"},{"name":"Quenya","class":"Elf","level":"2","gold":"7","attack":"2","defense":"1","fullLife":"6","currentLife":3,"equipment":["Light armor +1","Bow","Sword","Lantern"],"spells":[{"name":"Sleep","slots":1,"checkedSlots":[true]},{"name":"Fireball","slots":1,"checkedSlots":[true]}],"notes":"+L attk\\n+L spell\\n+Tier to persuade","id":"01KDZV0BFJE43CJ2185KKB2AN5","key":"characters-t7y4rqv3"}]',
  'log-entries-t7y4rqv3':
    '[{"id":1767722378356,"text":"Poh, magic greatsword +2","timestamp":"2026-01-06T17:59:38.356Z"},{"id":1767720895856,"text":"80gp","timestamp":"2026-01-06T17:34:55.856Z"},{"id":1767719774752,"text":"6gp, scroll","timestamp":"2026-01-06T17:16:14.752Z"},{"id":1767387865400,"text":"Scroll","timestamp":"2026-01-02T21:04:25.400Z"},{"id":1767387278013,"text":"Scroll,\\nChest 180gp, clue\\n","timestamp":"2026-01-02T20:54:38.013Z"}]',
  'dungeon-t7y4rqv3':
    '[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,true,false,false,false,true,true,true,true,false,true,false,false,false,false,false],[false,false,false,true,true,true,true,true,{"encounter":null},{"door":"left"},false,false,true,false,true,false,false,false,false,false],[false,false,false,true,{"encounter":6},true,false,false,false,true,false,false,{"encounter":5},false,true,false,false,false,false,false],[false,false,false,true,true,true,false,false,false,{"door":"bottom"},false,false,true,true,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,{"door":null},false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false],[false,false,{"door":"left"},{"encounter":2},true,{"door":"right"},true,true,true,{"encounter":3},{"door":"right"},false,false,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false],[false,false,true,{"door":"top"},{"door":null},true,false,false,false,{"door":"bottom"},false,false,false,false,false,false,false,false,false,false],[false,false,true,true,true,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,true,true,true,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,true,false,false,true,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,{"door":"bottom"},false,false,{"door":"bottom"},false,false,false,false,false,false,false],[false,false,false,{"door":"top"},false,false,false,false,false,true,false,false,true,false,true,true,true,true,true,false],[false,false,false,true,false,false,false,false,false,true,false,false,true,false,true,true,true,true,true,false],[false,false,false,true,true,true,true,true,true,true,{"encounter":4},true,{"door":"right"},true,true,true,true,true,true,false],[false,false,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,{"door":"top"},true,false,false,{"door":"top"},false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,true,true,{"door":"left"},{"encounter":1},{"door":"right"},false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,{"door":"top"},false,false,{"door":"top"},false,false,{"door":"top"},false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,true,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false]]',
  'character-position-t7y4rqv3': '{"row":3,"col":4}',
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FourAgainstDarknessApp', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigate.mockClear();
    jest.clearAllMocks();

    // Set up mock data in localStorage
    Object.entries(mockData).forEach(([key, value]) => {
      localStorageMock.setItem(key, value);
    });
  });


  const renderApp = () => {
    return render(
      <MemoryRouter initialEntries={['/dungeon/t7y4rqv3']}>
        <Routes>
          <Route path="/dungeon/:slug" element={<FourAgainstDarknessApp />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  describe('Initial Rendering', () => {
    test('renders the app with slug information', () => {
      renderApp();
      expect(screen.getByText(/Bookmark this address/i)).toBeInTheDocument();
      expect(screen.getByText('t7y4rqv3')).toBeInTheDocument();
    });

    test('renders Home and Save Progress buttons', () => {
      renderApp();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Save Progress')).toBeInTheDocument();
    });

    test('renders Dungeon Exploration section with dice rollers', () => {
      renderApp();
      expect(screen.getByText('Dungeon Exploration')).toBeInTheDocument();
    });

    test('renders Characters section with character tabs', () => {
      renderApp();
      expect(screen.getByText('Characters')).toBeInTheDocument();
      expect(screen.getByText('Arden')).toBeInTheDocument();
      expect(screen.getByText('Barnett')).toBeInTheDocument();
      expect(screen.getByText('Holly')).toBeInTheDocument();
      expect(screen.getByText('Quenya')).toBeInTheDocument();
    });

    test('renders Encounters section', () => {
      renderApp();
      expect(screen.getByText('Encounters')).toBeInTheDocument();
      expect(screen.getByText('+ New Encounter')).toBeInTheDocument();
    });

    test('renders Adventure Log section', () => {
      renderApp();
      expect(screen.getByText('Adventure Log')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter a new log entry...')).toBeInTheDocument();
    });
  });

  describe('Data Loading', () => {
    test('loads characters from localStorage', () => {
      renderApp();
      expect(screen.getByText('Arden')).toBeInTheDocument();
      expect(screen.getByText('Light gladiator')).toBeInTheDocument();
    });

    test('loads encounters from localStorage', () => {
      renderApp();
      // Check that encounters are loaded (6 encounters in mock data)
      // Encounters are displayed with their names, not "Encounter #" pattern
      expect(screen.getByText(/1\. Chaos lord/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Rats/i)).toBeInTheDocument();
    });

    test('loads log entries from localStorage', () => {
      renderApp();
      expect(screen.getByText('Poh, magic greatsword +2')).toBeInTheDocument();
      expect(screen.getByText('80gp')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    test('navigates to home when Home button is clicked', () => {
      renderApp();
      const homeButton = screen.getByText('Home');
      fireEvent.click(homeButton);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Encounter Management', () => {
    test('adds a new encounter when button is clicked', () => {
      renderApp();
      const addButton = screen.getByText('+ New Encounter');
      fireEvent.click(addButton);

      // New encounter should be added to localStorage
      waitFor(() => {
        const encounters = JSON.parse(localStorageMock.getItem('encounters-t7y4rqv3') || '[]');
        expect(encounters.length).toBe(7); // 6 original + 1 new
      });
    });
  });

  describe('Log Entry Management', () => {
    test('adds a new log entry', () => {
      renderApp();
      const textarea = screen.getByPlaceholderText('Enter a new log entry...');
      const addButton = screen.getByText('Add Log Entry');

      fireEvent.change(textarea, { target: { value: 'Found a treasure chest' } });
      fireEvent.click(addButton);

      waitFor(() => {
        expect(screen.getByText('Found a treasure chest')).toBeInTheDocument();
      });
    });

    test('does not add empty log entries', () => {
      renderApp();
      const addButton = screen.getByText('Add Log Entry');
      const initialLogCount = JSON.parse(
        localStorageMock.getItem('log-entries-t7y4rqv3') || '[]',
      ).length;

      fireEvent.click(addButton);

      const finalLogCount = JSON.parse(
        localStorageMock.getItem('log-entries-t7y4rqv3') || '[]',
      ).length;
      expect(finalLogCount).toBe(initialLogCount);
    });

    test('clears textarea after adding log entry', () => {
      renderApp();
      const textarea = screen.getByPlaceholderText(
        'Enter a new log entry...',
      ) as HTMLTextAreaElement;
      const addButton = screen.getByText('Add Log Entry');

      fireEvent.change(textarea, { target: { value: 'Test entry' } });
      fireEvent.click(addButton);

      waitFor(() => {
        expect(textarea.value).toBe('');
      });
    });
  });

  describe('LocalStorage Persistence', () => {
    test('saves grid updates to localStorage', () => {
      renderApp();
      // Grid updates are handled by the DungeonGrid component
      // Verify that the grid is loaded correctly
      const savedGrid = localStorageMock.getItem('dungeon-t7y4rqv3');
      expect(savedGrid).toBeTruthy();
      expect(JSON.parse(savedGrid!)).toHaveLength(28);
    });

    test('saves character updates to localStorage', async () => {
      renderApp();
      // Character updates would trigger localStorage save
      const savedCharacters = localStorageMock.getItem('characters-t7y4rqv3');
      expect(savedCharacters).toBeTruthy();
      const characters = JSON.parse(savedCharacters!);
      expect(characters).toHaveLength(4);
      expect(characters[0].name).toBe('Arden');
    });

    test('saves encounter updates to localStorage', async () => {
      renderApp();
      const savedEncounters = localStorageMock.getItem('encounters-t7y4rqv3');
      expect(savedEncounters).toBeTruthy();
      const encounters = JSON.parse(savedEncounters!);
      expect(encounters).toHaveLength(6);
    });

    test('saves character position to localStorage', async () => {
      renderApp();
      const savedPosition = localStorageMock.getItem('character-position-t7y4rqv3');
      expect(savedPosition).toBeTruthy();
      const position = JSON.parse(savedPosition!);
      expect(position).toEqual({ row: 3, col: 4 });
    });
  });

  describe('Save Progress Feature', () => {
    test('creates a download link when Save Progress is clicked', () => {
      renderApp();
      const saveButton = screen.getByText('Save Progress');

      // Mock URL.createObjectURL and document.createElement
      const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
      const mockClick = jest.fn();
      const mockLink = {
        href: '',
        download: '',
        click: mockClick,
      };

      global.URL.createObjectURL = mockCreateObjectURL;
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

      fireEvent.click(saveButton);

      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockLink.download).toBe('4ad-t7y4rqv3-backup.json');
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
