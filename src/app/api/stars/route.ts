// app/api/socket/route.ts
import dotenv from 'dotenv'
import { NextResponse } from 'next/server'
import { Context, Telegraf } from 'telegraf'

dotenv.config()

// Initialize the bot variable with the appropriate type
let bot: Telegraf<Context>

// Interface for the price object
interface Price {
  label: string
  amount: number
}

// Interface for the invoice object
interface Invoice {
  title: string
  description: string
  payload: string
  provider_token: string
  currency: string
  prices: Price[]
}

/**
 * Function to upgrade a user to Pro by creating an invoice link.
 * @param amount - The donation amount in XTR.
 * @returns A promise that resolves to the invoice link string.
 */
async function upgradeToPro(amount: string | number): Promise<string> {
  // Define the payload as a JSON string. Adjust as needed.
  const payload: string = JSON.stringify({})

  // Provider token for payment. Leave empty string if using XTR (Telegram Stars)
  const providerToken: string = ''

  const currency: string = 'XTR'

  // Ensure the amount is a valid number
  const parsedAmount: number = typeof amount === 'string' ? parseInt(amount, 10) : amount
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Invalid amount provided for donation.')
  }

  const prices: Price[] = [{ label: 'Donation', amount: parsedAmount }]

  const invoice: Invoice = {
    title: 'Donation',
    description: 'Support us with a donation',
    payload: payload,
    provider_token: providerToken,
    currency: currency,
    prices: prices,
  }

  try {
    const result: string = await bot.telegram.createInvoiceLink(invoice)
    console.log('Invoice link created:', result)
    return result
  } catch (error) {
    console.error('Failed to create invoice link:', error)
    throw new Error('Could not create invoice link.')
  }
}

/**
 * Initializes and launches the Telegram bot.
 */
const initTelegramBot = async (): Promise<void> => {
  const token = process.env.TG_TOKEN
  if (!token) {
    throw new Error('TG_TOKEN environment variable is not defined.')
  }

  bot = new Telegraf(token)

  // Handle pre-checkout queries
  bot.on('pre_checkout_query', async (ctx: Context) => {
    try {
      await ctx.answerPreCheckoutQuery(true)
      console.log('Pre-checkout query answered successfully.')
    } catch (error) {
      console.error('Failed to answer pre-checkout query:', error)
    }
  })

  // Launch the bot
  await bot.launch()
  console.log('Telegram bot launched successfully.')
}

// Initialize the Telegram bot and handle potential errors
initTelegramBot().catch(error => {
  console.error('Failed to initialize Telegram bot:', error)
})

export async function GET() {
  return NextResponse.json({ status: 'WebSocket server is running' })
}

export async function POST(req: Request) {
  try {
    const { amount } = await req.json()
    const invoiceLink = await upgradeToPro(amount)
    return NextResponse.json({ success: true, data: invoiceLink })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred.' },
      { status: 500 },
    )
  }
}
