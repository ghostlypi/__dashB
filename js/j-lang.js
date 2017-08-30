function Token(type,lexeme)
{
	this.type = type;
	this.lexeme;
}

function tokenize(src)
{
	const tokens = [];
	for(let i=0;i<src.length;i++)
	{
		if('0123456789'.includes(src.charAt(i)))
		{
			let num = '';
			while('0123456789'.includes(src.charAt(i))){num += src.charAt(i++);}
			i--;
			tokens.push(new Token('num',num))
		}
		else if('\'"'.includes(src.charAt(i)))
		{
			const end = src.charAt(i++);
			let str = '';
			while(src.charAt(i) !== end){str += src.charAt(i++);}
			tokens.push(new Token('str',str));
		}
		else if(src.charAt(i).toLowerCase() !== src.charAt(i).toUpperCase())
		{
			let wrd = '';
			while(src.charAt(i).toLowerCase() !== src.charAt(i).toUpperCase()){wrd += src.charAt(i++);}
			i--;
			switch(wrd)
			{
				case 'lm':	tokens.push(new Token('lm','lm'));break;
				case 'if':	tokens.push(new Token('if','if'));break;
				case 'el':	tokens.push(new Token('el','el'));break;
				default:
					tokens.push(new Token('wrd',wrd));
					continue;
			}
		}
		else
		{
			switch(src.charAt(i))
			{
				case '+':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('set_inc','+='))
						break;
					}
					tokens.push(new Token('inc'),'+');
					break;
				case '-':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('set_dec','-='))
						break;
					}
					tokens.push(new Token('dec'),'-');
					break;
				case '*':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('set_mul','*='))
						break;
					}
					tokens.push(new Token('mul'),'*');
					break;
				case '/':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('set_div','/='))
						break;
					}
					tokens.push(new Token('div'),'/');
					break;
				case '=':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('cmp_eq','=='))
						break;
					}
					tokens.push(new Token('set'),'=');
					break;
				case '<':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('lt_eq','<='))
						break;
					}
					tokens.push(new Token('lt'),'<');
					break;
				case '>':
					if(i+1 < src.length && src.charAt(i+1) === '=')
					{
						i++;
						tokens.push(new Token('gt_eq','>='))
						break;
					}
					tokens.push(new Token('gt'),'>');
					break;
				case '&':	tokens.push(new Token('and','&'));break;
				case '|':	tokens.push(new Token('or','|'));break;
				default:
					break;
			}
		}
	}
	return tokens;
}

function parse(tokens)
{
	
}
