import type { LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      {/* Outer circle - Dark blue background */}
      <circle cx="100" cy="100" r="98" fill="#001a66" stroke="#001a66" strokeWidth="0"/>
      
      {/* Repeating whale pattern around border - decorative small whales */}
      <g fill="none" stroke="#6495ff" strokeWidth="1" opacity="0.6">
        <path d="M 100 12 Q 97 14 95 12 M 97 14 L 96 17"/>
        <path d="M 128 22 Q 125 24 123 22 M 125 24 L 124 27"/>
        <path d="M 152 38 Q 149 40 147 38 M 149 40 L 148 43"/>
        <path d="M 170 62 Q 167 64 165 62 M 167 64 L 166 67"/>
        <path d="M 178 90 Q 175 92 173 90 M 175 92 L 174 95"/>
        <path d="M 177 118 Q 174 120 172 118 M 174 120 L 173 123"/>
        <path d="M 168 146 Q 165 148 163 146 M 165 148 L 164 151"/>
        <path d="M 152 168 Q 149 170 147 168 M 149 170 L 148 173"/>
        <path d="M 128 182 Q 125 184 123 182 M 125 184 L 124 187"/>
        <path d="M 100 190 Q 97 192 95 190 M 97 192 L 96 195"/>
        <path d="M 72 182 Q 69 184 67 182 M 69 184 L 68 187"/>
        <path d="M 48 168 Q 45 170 43 168 M 45 170 L 44 173"/>
        <path d="M 32 146 Q 29 148 27 146 M 29 148 L 28 151"/>
        <path d="M 23 118 Q 20 120 18 118 M 20 120 L 19 123"/>
        <path d="M 22 90 Q 19 92 17 90 M 19 92 L 18 95"/>
        <path d="M 30 62 Q 27 64 25 62 M 27 64 L 26 67"/>
        <path d="M 48 38 Q 45 40 43 38 M 45 40 L 44 43"/>
        <path d="M 72 22 Q 69 24 67 22 M 69 24 L 68 27"/>
      </g>

      {/* Inner white circle */}
      <circle cx="100" cy="100" r="80" fill="white"/>

      {/* Main whale illustration - centered and larger */}
      <g fill="none" stroke="#1a1a4d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Whale body - main body shape */}
        <path d="M 70 105 Q 65 110 70 120 L 100 128 L 130 120 Q 135 110 130 105 Z"/>
        
        {/* Whale tail - left side */}
        <path d="M 70 115 Q 55 115 45 105"/>
        <path d="M 70 120 Q 55 125 45 130"/>
        
        {/* Whale flippers/fins */}
        <path d="M 80 115 L 75 125"/>
        <path d="M 120 115 L 125 125"/>
        
        {/* Whale head - right side */}
        <path d="M 130 105 Q 145 100 155 95"/>
        <path d="M 130 110 Q 150 108 160 105"/>
        
        {/* Whale spout/blowhole area */}
        <path d="M 150 95 Q 155 85 160 75"/>
        <path d="M 155 92 L 160 82"/>
        
        {/* Spout water drops */}
        <circle cx="157" cy="78" r="1.5" fill="#1a1a4d"/>
        <circle cx="162" cy="72" r="1.5" fill="#1a1a4d"/>
        <circle cx="165" cy="65" r="1.5" fill="#1a1a4d"/>
        
        {/* Whale eye */}
        <circle cx="140" cy="98" r="2" fill="#1a1a4d"/>
        
        {/* Body texture - spots */}
        <circle cx="90" cy="118" r="1.2" fill="#1a1a4d"/>
        <circle cx="100" cy="125" r="1.2" fill="#1a1a4d"/>
        <circle cx="110" cy="120" r="1.2" fill="#1a1a4d"/>
        <circle cx="105" cy="110" r="1.2" fill="#1a1a4d"/>
      </g>
    </svg>
  ),
};
