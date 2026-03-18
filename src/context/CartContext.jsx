import { createContext, useContext, useReducer, useCallback } from 'react'

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext(null)

// ─── Reducer ─────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.dish.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.dish.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.dish, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }

    case 'UPDATE_QTY': {
      const qty = Math.max(0, action.qty)
      if (qty === 0) return { ...state, items: state.items.filter(i => i.id !== action.id) }
      return {
        ...state,
        items: state.items.map(i => (i.id === action.id ? { ...i, qty } : i)),
      }
    }
    case 'CLEAR':
      return { ...state, items: [] }

    default:
      return state
  }
}

const initialState = { items: [] }

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart   = useCallback((dish) => dispatch({ type: 'ADD',        dish }), [])
  const removeItem  = useCallback((id)   => dispatch({ type: 'REMOVE',     id   }), [])
  const updateQty   = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }), [])
  const clearCart   = useCallback(()    => dispatch({ type: 'CLEAR'            }), [])

  const totalItems  = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice  = state.items.reduce((s, i) => {
    const price = parseFloat((i.price || '0').replace(/[^\d.]/g, ''))
    return s + price * i.qty
  }, 0)

  const getQty = useCallback(
    (id) => state.items.find(i => i.id === id)?.qty || 0,
    [state.items]
  )

  return (
    <CartContext.Provider
      value={{ items: state.items, addToCart, removeItem, updateQty, clearCart, totalItems, totalPrice, getQty }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
