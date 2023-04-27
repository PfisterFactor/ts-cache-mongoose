import { getKey } from '../src/crypto'

import { Types } from 'mongoose'
const { ObjectId } = Types

describe('generateHash()', () => {
  const data1 = {
    foo: 42,
    bar: {
      baz: [3, 2, 1],
      qux: 'hello',
      _id: new ObjectId('5f9b3b3b3b3b3b3b3b3b3b3b'),
      wow: {
        word: 'world',
        hey: {
          waldo: true,
          fred: null,
          missing: undefined
        }
      }
    }
  }

  const data2 = {
    foo: 42,
    bar: {
      _id: new ObjectId('5f9b3b3b3b3b3b3b3b3b3b3b'),
      baz: [3, 2, 1],
      qux: 'hello',
      wow: {
        word: 'world',
        hey: {
          waldo: true,
          fred: null,
          missing: undefined
        }
      }
    }
  }

  const data3 = {
    _id: new ObjectId('5f9b3b3b3b3b3b3b3b3b3b3b'),
    bar: {
      qux: 'hello',
      baz: [3, 2, 1],
      wow: {
        hey: {
          fred: null,
          waldo: true,
          missing: undefined
        },
        word: 'world'
      }
    },
    foo: 42
  }

  const data4 = {
    _id: new ObjectId('1f9b3b3b3b3b3b3b3b3b3b3b'),
    bar: {
      qux: 'hello',
      baz: [3, 2, 1],
      wow: {
        hey: {
          fred: null,
          waldo: true,
          missing: undefined
        },
        word: 'world'
      }
    },
    foo: 42
  }

  it('should generate hash keys for objects with different key orders', () => {
    const hash1 = getKey(data1)
    const hash2 = getKey(data2)
    const hash3 = getKey(data3)
    const hash4 = getKey(data4)

    expect(hash1).toEqual(hash2)
    expect(hash1).not.toEqual(hash3)
    expect(hash3).not.toEqual(hash4)
  })
})