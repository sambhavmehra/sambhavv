'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  Key, 
  Hash, 
  FileJson, 
  Binary, 
  Link2, 
  FolderSearch, 
  Copy, 
  RotateCcw, 
  Check, 
  X, 
  AlertTriangle,
  Info,
  ShieldCheck,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

// --- Pure JS MD5 Implementation ---
function md5(string) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }
  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }
  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  string = Utf8Encode(string);
  x = ConvertToWordArray(string);
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a; BB = b; CC = c; DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235); c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD);
  }
  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('password');

  const tools = [
    { id: 'password', name: 'Password Strength', icon: Key },
    { id: 'hash', name: 'Hash Generator', icon: Hash },
    { id: 'jwt', name: 'JWT Decoder', icon: FileJson },
    { id: 'base64', name: 'Base64 Coder', icon: Binary },
    { id: 'url', name: 'URL Coder', icon: Link2 },
    { id: 'ports', name: 'Common Ports', icon: FolderSearch }
  ];

  // Helper copy text function
  const copyToClipboard = (text, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-[var(--matrix-green)] font-mono text-sm mb-2">
            <ShieldCheck size={16} />
            <span>OFFLINE BROWSER TOOLKIT</span>
          </div>
          <h1 className="text-3xl font-bold font-mono tracking-tight text-foreground sm:text-4xl">
            Security <span className="text-[var(--matrix-green)]">Dashboard</span>
          </h1>
          <p className="text-foreground/60 text-sm max-w-2xl mt-2 font-mono">
            A clean dashboard of utility tools running 100% locally in your browser. No data ever leaves your computer.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-col gap-1.5">
              {tools.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-mono font-medium transition-all text-left border ${
                      isActive 
                        ? 'bg-[var(--matrix-green)]/10 text-[var(--matrix-green)] border-[var(--matrix-green)]/30' 
                        : 'bg-white/[0.01] hover:bg-white/[0.04] text-foreground/75 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{t.name}</span>
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Navigation Dropdown */}
            <div className="lg:hidden">
              <label htmlFor="tool-select" className="sr-only">Select Security Tool</label>
              <select
                id="tool-select"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full bg-[rgba(15,15,15,0.9)] border border-white/10 rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none focus:border-[var(--matrix-green)]"
              >
                {tools.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Main Dashboard Tool Workspace */}
          <main className="flex-1 bg-[rgba(10,10,10,0.3)] border border-white/10 rounded-xl p-6 min-h-[500px]">
            {activeTab === 'password' && <PasswordChecker copyToClipboard={copyToClipboard} />}
            {activeTab === 'hash' && <HashGenerator copyToClipboard={copyToClipboard} />}
            {activeTab === 'jwt' && <JwtDecoder copyToClipboard={copyToClipboard} />}
            {activeTab === 'base64' && <Base64Coder copyToClipboard={copyToClipboard} />}
            {activeTab === 'url' && <UrlCoder copyToClipboard={copyToClipboard} />}
            {activeTab === 'ports' && <PortsLookup />}
          </main>

        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 1: PASSWORD STRENGTH CHECKER
// -------------------------------------------------------------
function PasswordChecker({ copyToClipboard }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [strength, setStrength] = useState({ label: 'None', color: 'text-foreground/40', barColor: 'bg-white/10' });

  const criteria = {
    length: password.length >= 12,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  useEffect(() => {
    if (!password) {
      setEntropy(0);
      setStrength({ label: 'None', color: 'text-foreground/40', barColor: 'bg-white/10' });
      return;
    }

    // Entropy calculation
    let poolSize = 0;
    if (criteria.hasLower) poolSize += 26;
    if (criteria.hasUpper) poolSize += 26;
    if (criteria.hasNumber) poolSize += 10;
    if (criteria.hasSpecial) poolSize += 32;

    if (poolSize === 0) poolSize = 1;

    const calcEntropy = Math.round(password.length * Math.log2(poolSize));
    setEntropy(calcEntropy);

    // Evaluate label
    if (calcEntropy < 30) {
      setStrength({ label: 'Very Weak (Highly Vulnerable)', color: 'text-red-500', barColor: 'bg-red-500 w-1/5' });
    } else if (calcEntropy >= 30 && calcEntropy < 55) {
      setStrength({ label: 'Weak (Vulnerable to Brute-Force)', color: 'text-amber-500', barColor: 'bg-amber-500 w-2/5' });
    } else if (calcEntropy >= 55 && calcEntropy < 80) {
      setStrength({ label: 'Moderate (Decent security)', color: 'text-yellow-500', barColor: 'bg-yellow-500 w-3/5' });
    } else if (calcEntropy >= 80 && calcEntropy < 110) {
      setStrength({ label: 'Strong (Secure password)', color: 'text-emerald-500', barColor: 'bg-emerald-500 w-4/5' });
    } else {
      setStrength({ label: 'Very Strong (Cryptographically safe)', color: 'text-[var(--matrix-green)]', barColor: 'bg-[var(--matrix-green)] w-full' });
    }

  }, [password, criteria.hasLower, criteria.hasUpper, criteria.hasNumber, criteria.hasSpecial]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">Password Strength Evaluator</h2>
        <p className="text-foreground/60 text-xs font-mono">Evaluate security strength, Shannon entropy, and requirements.</p>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div className="relative">
          <label htmlFor="eval-pass" className="sr-only">Input Password</label>
          <input
            id="eval-pass"
            type={showPassword ? 'text' : 'password'}
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Strength Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-foreground/60">Calculated Entropy:</span>
            <span className="font-bold text-foreground">{entropy} bits</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${strength.barColor}`} />
          </div>
          <div className="text-sm font-mono">
            Rating: <span className={`font-bold ${strength.color}`}>{strength.label}</span>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-lg space-y-2 font-mono text-xs">
          <span className="text-foreground/40 block mb-1">STRENGTH CHECKLIST</span>
          <div className="flex items-center gap-2">
            {criteria.length ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span className={criteria.length ? 'text-foreground/90' : 'text-foreground/40'}>Minimum 12 characters (Current length: {password.length})</span>
          </div>
          <div className="flex items-center gap-2">
            {criteria.hasUpper ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span className={criteria.hasUpper ? 'text-foreground/90' : 'text-foreground/40'}>Contains uppercase letters</span>
          </div>
          <div className="flex items-center gap-2">
            {criteria.hasLower ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span className={criteria.hasLower ? 'text-foreground/90' : 'text-foreground/40'}>Contains lowercase letters</span>
          </div>
          <div className="flex items-center gap-2">
            {criteria.hasNumber ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span className={criteria.hasNumber ? 'text-foreground/90' : 'text-foreground/40'}>Contains numbers</span>
          </div>
          <div className="flex items-center gap-2">
            {criteria.hasSpecial ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span className={criteria.hasSpecial ? 'text-foreground/90' : 'text-foreground/40'}>Contains special characters</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => copyToClipboard(password, 'Password')}
            disabled={!password}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-[var(--matrix-green)] rounded-lg text-xs font-mono text-foreground hover:text-[var(--matrix-green)] transition-all disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-foreground"
          >
            <Copy size={14} />
            <span>COPY</span>
          </button>
          <button
            onClick={() => setPassword('')}
            disabled={!password}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500 rounded-lg text-xs font-mono text-foreground hover:text-red-500 transition-all disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-foreground"
          >
            <RotateCcw size={14} />
            <span>RESET</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 2: HASH GENERATOR
// -------------------------------------------------------------
function HashGenerator({ copyToClipboard }) {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    const generateHashes = async () => {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        // MD5 (JS Fallback)
        const md5Hash = md5(input);

        // SHA-1
        const sha1Buf = await window.crypto.subtle.digest('SHA-1', data);
        const sha1Hex = Array.from(new Uint8Array(sha1Buf)).map(b => b.toString(16).padStart(2, '0')).join('');

        // SHA-256
        const sha256Buf = await window.crypto.subtle.digest('SHA-256', data);
        const sha256Hex = Array.from(new Uint8Array(sha256Buf)).map(b => b.toString(16).padStart(2, '0')).join('');

        // SHA-512
        const sha512Buf = await window.crypto.subtle.digest('SHA-512', data);
        const sha512Hex = Array.from(new Uint8Array(sha512Buf)).map(b => b.toString(16).padStart(2, '0')).join('');

        setHashes({
          md5: md5Hash,
          sha1: sha1Hex,
          sha256: sha256Hex,
          sha512: sha512Hex
        });

      } catch (err) {
        console.error('Error generating hashes:', err);
      }
    };

    generateHashes();
  }, [input]);

  const hashList = [
    { label: 'MD5', value: hashes.md5 },
    { label: 'SHA-1', value: hashes.sha1 },
    { label: 'SHA-256', value: hashes.sha256 },
    { label: 'SHA-512', value: hashes.sha512 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">Hash Generator</h2>
        <p className="text-foreground/60 text-xs font-mono">Compute cryptographic checksum hashes for a text input locally.</p>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label htmlFor="hash-input" className="sr-only">Input text to hash</label>
          <textarea
            id="hash-input"
            rows={3}
            placeholder="Type or paste input text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none resize-none"
          />
        </div>

        {/* Output list */}
        <div className="space-y-4 font-mono">
          {hashList.map((hash) => (
            <div key={hash.label} className="bg-white/[0.01] border border-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[var(--cyber-blue)]">{hash.label}</span>
                <button
                  onClick={() => copyToClipboard(hash.value, hash.label)}
                  disabled={!hash.value}
                  className="p-1 rounded text-foreground/50 hover:text-[var(--matrix-green)] hover:bg-white/5 transition-all disabled:opacity-30"
                  title="Copy Hash"
                >
                  <Copy size={14} />
                </button>
              </div>
              <div className="text-xs text-foreground/80 break-all bg-black/20 p-2 border border-white/5 rounded min-h-[32px] flex items-center">
                {hash.value || <span className="text-foreground/20 italic">No input to hash...</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Reset */}
        <div>
          <button
            onClick={() => setInput('')}
            disabled={!input}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500 rounded-lg text-xs font-mono text-foreground hover:text-red-500 transition-all disabled:opacity-40 disabled:hover:border-white/10"
          >
            <RotateCcw size={14} />
            <span>RESET</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 3: JWT DECODER
// -------------------------------------------------------------
function JwtDecoder({ copyToClipboard }) {
  const [jwtInput, setJwtInput] = useState('');
  const [decoded, setDecoded] = useState({ header: null, payload: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jwtInput) {
      setDecoded({ header: null, payload: null });
      setError(null);
      return;
    }

    const decodeJwt = () => {
      const parts = jwtInput.trim().split('.');
      if (parts.length !== 3) {
        setError('Structure mismatch: A JSON Web Token must contain exactly 3 segments separated by dots (header.payload.signature).');
        setDecoded({ header: null, payload: null });
        return;
      }

      try {
        const base64UrlDecode = (str) => {
          let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) {
            base64 += '=';
          }
          return decodeURIComponent(
            Array.prototype.map.call(atob(base64), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
          );
        };

        const headerDecoded = JSON.parse(base64UrlDecode(parts[0]));
        const payloadDecoded = JSON.parse(base64UrlDecode(parts[1]));

        setDecoded({
          header: headerDecoded,
          payload: payloadDecoded
        });
        setError(null);

      } catch (err) {
        setError('Decoding failure: Failed to base64url-decode or parse JSON payloads in JWT.');
        setDecoded({ header: null, payload: null });
      }
    };

    decodeJwt();
  }, [jwtInput]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">JWT Decoder</h2>
        <p className="text-foreground/60 text-xs font-mono">Parse JSON Web Tokens to analyze header and payload schemas locally.</p>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label htmlFor="jwt-input" className="sr-only">Input JWT</label>
          <textarea
            id="jwt-input"
            rows={3}
            placeholder="Paste your JWT token (header.payload.signature) here..."
            value={jwtInput}
            onChange={(e) => setJwtInput(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none resize-none"
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-lg flex items-start gap-2.5 text-red-400 font-mono text-xs">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          
          {/* Header */}
          <div className="bg-white/[0.01] border border-white/5 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5">
                <span className="font-bold text-[var(--neon-red)]">HEADER (Algorithm & Type)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), 'Header')}
                  disabled={!decoded.header}
                  className="p-1 rounded text-foreground/50 hover:text-[var(--matrix-green)] hover:bg-white/5 transition-all disabled:opacity-30"
                  title="Copy Header JSON"
                >
                  <Copy size={12} />
                </button>
              </div>
              <pre className="text-foreground/80 overflow-x-auto p-2 bg-black/20 rounded min-h-[120px] whitespace-pre-wrap break-all">
                {decoded.header ? JSON.stringify(decoded.header, null, 2) : <span className="text-foreground/20 italic">Awaiting JWT input...</span>}
              </pre>
            </div>
          </div>

          {/* Payload */}
          <div className="bg-white/[0.01] border border-white/5 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5">
                <span className="font-bold text-[var(--cyber-blue)]">PAYLOAD (Data Claims)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), 'Payload')}
                  disabled={!decoded.payload}
                  className="p-1 rounded text-foreground/50 hover:text-[var(--matrix-green)] hover:bg-white/5 transition-all disabled:opacity-30"
                  title="Copy Payload JSON"
                >
                  <Copy size={12} />
                </button>
              </div>
              <pre className="text-foreground/80 overflow-x-auto p-2 bg-black/20 rounded min-h-[120px] whitespace-pre-wrap break-all">
                {decoded.payload ? JSON.stringify(decoded.payload, null, 2) : <span className="text-foreground/20 italic">Awaiting JWT input...</span>}
              </pre>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div>
          <button
            onClick={() => setJwtInput('')}
            disabled={!jwtInput}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500 rounded-lg text-xs font-mono text-foreground hover:text-red-500 transition-all disabled:opacity-40 disabled:hover:border-white/10"
          >
            <RotateCcw size={14} />
            <span>RESET</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 4: BASE64 CODER
// -------------------------------------------------------------
function Base64Coder({ copyToClipboard }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncode, setIsEncode] = useState(true);
  const [error, setError] = useState(null);

  const processText = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (isEncode) {
        // Safe encoding for unicode strings
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) => 
            String.fromCharCode('0x' + p1)
          )
        );
        setOutput(encoded);
        setError(null);
      } else {
        // Safe decoding for unicode strings
        const decoded = decodeURIComponent(
          Array.prototype.map.call(atob(input.trim()), (c) => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join('')
        );
        setOutput(decoded);
        setError(null);
      }
    } catch (err) {
      setError('Conversion Error: Invalid characters. Verify that your input matches standard Base64 representation.');
      setOutput('');
    }
  };

  useEffect(() => {
    processText();
  }, [input, isEncode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-foreground mb-1">Base64 Encoder / Decoder</h2>
          <p className="text-foreground/60 text-xs font-mono">Perform fast text-to-base64 conversions locally.</p>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex gap-1.5 p-1 bg-black/40 border border-white/5 rounded-lg font-mono text-xs">
          <button
            onClick={() => setIsEncode(true)}
            className={`px-3 py-1.5 rounded transition-all ${isEncode ? 'bg-[var(--matrix-green)]/15 text-[var(--matrix-green)]' : 'text-foreground/60 hover:text-foreground'}`}
          >
            ENCODE
          </button>
          <button
            onClick={() => setIsEncode(false)}
            className={`px-3 py-1.5 rounded transition-all ${!isEncode ? 'bg-[var(--matrix-green)]/15 text-[var(--matrix-green)]' : 'text-foreground/60 hover:text-foreground'}`}
          >
            DECODE
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label htmlFor="b64-input" className="block text-xs font-mono text-foreground/50 mb-1.5 uppercase">
            Input ({isEncode ? 'Plain Text' : 'Base64'})
          </label>
          <textarea
            id="b64-input"
            rows={3}
            placeholder={isEncode ? "Enter text to encode..." : "Enter Base64 text to decode..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none resize-none"
          />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-lg flex items-start gap-2.5 text-red-400 font-mono text-xs">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-foreground/50 uppercase">
              Output ({isEncode ? 'Base64' : 'Plain Text'})
            </span>
            <button
              onClick={() => copyToClipboard(output, 'Output')}
              disabled={!output}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--matrix-green)] hover:text-[var(--cyber-blue)] disabled:opacity-30"
            >
              <Copy size={12} />
              <span>COPY</span>
            </button>
          </div>
          <div className="w-full bg-black/20 border border-white/5 rounded-lg p-4 text-foreground text-sm font-mono break-all min-h-[80px] select-all">
            {output || <span className="text-foreground/20 italic">No output generated...</span>}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setInput('')}
            disabled={!input}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500 rounded-lg text-xs font-mono text-foreground hover:text-red-500 transition-all disabled:opacity-40 disabled:hover:border-white/10"
          >
            <RotateCcw size={14} />
            <span>RESET</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 5: URL CODER
// -------------------------------------------------------------
function UrlCoder({ copyToClipboard }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncode, setIsEncode] = useState(true);
  const [error, setError] = useState(null);

  const processText = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (isEncode) {
        setOutput(encodeURIComponent(input));
        setError(null);
      } else {
        setOutput(decodeURIComponent(input));
        setError(null);
      }
    } catch (err) {
      setError('Decoding Error: Failed to percent-decode your text. Ensure proper URL percent encoding schema.');
      setOutput('');
    }
  };

  useEffect(() => {
    processText();
  }, [input, isEncode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-foreground mb-1">URL Encoder / Decoder</h2>
          <p className="text-foreground/60 text-xs font-mono">Perform local percent encoding and decoding for URL safe strings.</p>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex gap-1.5 p-1 bg-black/40 border border-white/5 rounded-lg font-mono text-xs">
          <button
            onClick={() => setIsEncode(true)}
            className={`px-3 py-1.5 rounded transition-all ${isEncode ? 'bg-[var(--matrix-green)]/15 text-[var(--matrix-green)]' : 'text-foreground/60 hover:text-foreground'}`}
          >
            ENCODE
          </button>
          <button
            onClick={() => setIsEncode(false)}
            className={`px-3 py-1.5 rounded transition-all ${!isEncode ? 'bg-[var(--matrix-green)]/15 text-[var(--matrix-green)]' : 'text-foreground/60 hover:text-foreground'}`}
          >
            DECODE
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label htmlFor="url-input" className="block text-xs font-mono text-foreground/50 mb-1.5 uppercase">
            Input ({isEncode ? 'Plain URL/Text' : 'Encoded URL'})
          </label>
          <textarea
            id="url-input"
            rows={3}
            placeholder={isEncode ? "Enter URL parameters to encode..." : "Enter encoded URL text to decode..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none resize-none"
          />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-lg flex items-start gap-2.5 text-red-400 font-mono text-xs">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-foreground/50 uppercase">
              Output ({isEncode ? 'Encoded URL' : 'Decoded URL'})
            </span>
            <button
              onClick={() => copyToClipboard(output, 'Output')}
              disabled={!output}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--matrix-green)] hover:text-[var(--cyber-blue)] disabled:opacity-30"
            >
              <Copy size={12} />
              <span>COPY</span>
            </button>
          </div>
          <div className="w-full bg-black/20 border border-white/5 rounded-lg p-4 text-foreground text-sm font-mono break-all min-h-[80px] select-all">
            {output || <span className="text-foreground/20 italic">No output generated...</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setInput('')}
            disabled={!input}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500 rounded-lg text-xs font-mono text-foreground hover:text-red-500 transition-all disabled:opacity-40 disabled:hover:border-white/10"
          >
            <RotateCcw size={14} />
            <span>RESET</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TOOL 6: COMMON PORTS LOOKUP
// -------------------------------------------------------------
function PortsLookup() {
  const [search, setSearch] = useState('');

  const commonPorts = [
    { port: 20, service: 'FTP (Data)', protocol: 'TCP', description: 'File Transfer Protocol data connection' },
    { port: 21, service: 'FTP (Control)', protocol: 'TCP', description: 'File Transfer Protocol command transmission' },
    { port: 22, service: 'SSH / SFTP', protocol: 'TCP', description: 'Secure Shell / Secure FTP encrypted session' },
    { port: 23, service: 'Telnet', protocol: 'TCP', description: 'Unencrypted remote command terminal communication' },
    { port: 25, service: 'SMTP', protocol: 'TCP', description: 'Simple Mail Transfer Protocol mail relays' },
    { port: 53, service: 'DNS', protocol: 'TCP/UDP', description: 'Domain Name System host translation queries' },
    { port: 80, service: 'HTTP', protocol: 'TCP', description: 'Hypertext Transfer Protocol unencrypted web traffic' },
    { port: 110, service: 'POP3', protocol: 'TCP', description: 'Post Office Protocol version 3 email fetching' },
    { port: 123, service: 'NTP', protocol: 'UDP', description: 'Network Time Protocol clock synchronization' },
    { port: 143, service: 'IMAP', protocol: 'TCP', description: 'Internet Message Access Protocol client email management' },
    { port: 443, service: 'HTTPS', protocol: 'TCP', description: 'Hypertext Transfer Protocol Secure (TLS/SSL)' },
    { port: 445, service: 'SMB', protocol: 'TCP', description: 'Server Message Block directory file shares' },
    { port: 993, service: 'IMAPS', protocol: 'TCP', description: 'IMAP Secure encrypted client email delivery' },
    { port: 995, service: 'POP3S', protocol: 'TCP', description: 'POP3 Secure encrypted client email retrieval' },
    { port: 1433, service: 'MSSQL', protocol: 'TCP', description: 'Microsoft SQL Server database communication' },
    { port: 3306, service: 'MySQL', protocol: 'TCP', description: 'MySQL relational database connectivity' },
    { port: 3389, service: 'RDP', protocol: 'TCP', description: 'Remote Desktop Protocol virtual administrative terminal' },
    { port: 5432, service: 'PostgreSQL', protocol: 'TCP', description: 'PostgreSQL relational database services' },
    { port: 8080, service: 'HTTP Alternate', protocol: 'TCP', description: 'Alternate web server listening or proxy setups' }
  ];

  const filteredPorts = commonPorts.filter(item => {
    const s = search.toLowerCase();
    return (
      item.port.toString().includes(s) ||
      item.service.toLowerCase().includes(s) ||
      item.description.toLowerCase().includes(s) ||
      item.protocol.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">Common Ports Reference</h2>
        <p className="text-foreground/60 text-xs font-mono">Reference sheet of standardized administrative ports and system protocols.</p>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="port-search" className="sr-only">Search ports...</label>
          <input
            id="port-search"
            type="text"
            placeholder="Search port number, service, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[var(--matrix-green)] rounded-lg py-3 px-4 text-foreground text-sm font-mono outline-none"
          />
        </div>

        {/* Table/List */}
        <div className="border border-white/10 rounded-lg overflow-hidden max-h-[380px] overflow-y-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-[var(--cyber-blue)] text-[10px] tracking-wider uppercase font-bold">
                <th className="py-3 px-4">Port</th>
                <th className="py-3 px-4">Protocol</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-foreground/80">
              {filteredPorts.length > 0 ? (
                filteredPorts.map((item) => (
                  <tr key={item.port} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 font-bold text-[var(--matrix-green)]">{item.port}</td>
                    <td className="py-3 px-4 text-foreground/50">{item.protocol}</td>
                    <td className="py-3 px-4 text-foreground/90 font-bold">{item.service}</td>
                    <td className="py-3 px-4 leading-normal text-foreground/60">{item.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-foreground/30 italic">
                    No ports match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
