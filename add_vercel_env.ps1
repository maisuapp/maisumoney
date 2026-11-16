$envLine = Get-Content .\.env | Where-Object { $_ -match '^DATABASE_URL=' }
$value = $envLine -replace '^DATABASE_URL="','' -replace '"$','' -replace '\\u0026','&'
vercel env add DATABASE_URL production --value "${value}" --yes
