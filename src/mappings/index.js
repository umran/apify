const ImageMapping = {
  properties: {
    uri: { type: 'text' },
    height: { type: 'float' },
    width: { type: 'float' }
  }
}

const VideoMapping = {
  properties: {
    uri: { type: 'text' },
    height: { type: 'float' },
    width: { type: 'float' }
  }
}

const PromotionMapping = {
  properties: {
    type: { type: 'text' },
    discount: { type: 'float' }
  }
}

const PricingMapping = {
  properties: {
    currency_code: { type: 'text' },
    price: { type: 'float' },
    promotion: {
      type: 'object',
      properties: PromotionMapping.properties
    }
  }
}

const AddressMapping = {
  properties: {
    line_1: { type: 'text' },
    line_2: { type: 'text' },
    city: { type: 'text' },
    province: { type: 'text' },
    postal_code: { type: 'text' }
  }
}

const MetaMapping = {
  properties: {
    title: { type: 'text' },
    description: { type: 'text' },
    keywords: { type: 'text' },
    image: {
      type: 'object',
      properties: ImageMapping.properties
    },
    twitter_image: {
      type: 'object',
      properties: ImageMapping.properties
    },
    facebook_image: {
      type: 'object',
      properties: ImageMapping.properties
    }
  }
}

const BannerMapping = {
  properties: {
    image: {
      type: 'object',
      properties: ImageMapping.properties
    },
    header: { type: 'text' },
    subheader: { type: 'text' },
    body: { type: 'text' }
  }
}

const ProgrammeWebProfileMapping = {
  properties: {
    meta: {
      type: 'object',
      properties: MetaMapping.properties
    },
    banner: {
      type: 'object',
      properties: BannerMapping.properties
    }
  }
}

const ProviderWebProfileMapping = {
  properties: {
    meta: {
      type: 'object',
      properties: MetaMapping.properties
    },
    banner: {
      type: 'object',
      properties: BannerMapping.properties
    }
  }
}

const InstructorWebProfileMapping = {
  properties: {
    meta: {
      type: 'object',
      properties: MetaMapping.properties
    },
    banner: {
      type: 'object',
      properties: BannerMapping.properties
    }
  }
}

const ProgrammeChoiceGroupMapping = {
  properties: {
    programme_types: { type: 'text' },
    exclude_peak_times: { type: 'boolean' },
    quantity: { type: 'integer' }
  }
}

const ProviderMapping = {
  properties: {
    name: { type: 'text' },
    logo: {
      type: 'object',
      properties: ImageMapping.properties
    },
    description: { type: 'text' },
    web_profile: {
      type: 'object',
      properties: ProviderWebProfileMapping.properties
    }
  }
}

const InstructorMapping = {
  properties: {
    name: { type: 'text' },
    description: { type: 'text' },
    display_image: {
      type: 'object',
      properties: ImageMapping.properties
    },
    web_profile: {
      type: 'object',
      properties: InstructorWebProfileMapping.properties
    }
  }
}

const LocationMapping = {
  properties: {
    name: { type: 'text' },
    address: {
      type: 'object',
      properties: AddressMapping.properties
    }
  }
}

const VenueMapping = {
  properties: {
    room: { type: 'text' },
    location: {
      type: 'object',
      properties: LocationMapping.properties
    }
  }
}

const ProgrammeMapping = {
  properties: {
    name: { type: 'text' },
    type: { type: 'text' },
    provider: {
      type: 'object',
      properties: ProviderMapping.properties
    },
    logo: {
      type: 'object',
      properties: ImageMapping.properties
    },
    description: { type: 'text' },
    web_profile: {
      type: 'object',
      properties: ProgrammeWebProfileMapping.properties
    }
  }
}

const ProgrammeInstanceMapping = {
  properties: {
    programme: {
      type: 'object',
      properties: ProgrammeMapping.properties
    },
    instructor: {
      type: 'object',
      properties: InstructorMapping.properties
    },
    start: { type: 'date' },
    end: { type: 'date' },
    recurrence: { type: 'text' },
    peak: { type: 'boolean' },
    capacity: { type: 'integer' },
    pricing: {
      type: 'object',
      properties: PricingMapping.properties
    },
    venue: {
      type: 'object',
      properties: VenueMapping.properties
    }
  }
}

const MemberMapping = {
  properties: {
    name: { type: 'text' },
    phone: { type: 'text' },
    email: { type: 'text' }
  }
}

const MembershipPlanMapping = {
  properties: {
    name: { type: 'text' },
    programme_choice_groups: {
      type: 'nested',
      properties: ProgrammeChoiceGroupMapping.properties
    },
    pricing: {
      type: 'object',
      properties: PricingMapping.properties
    }
  }
}

// state models
const AuthorizationMapping = {
  properties: {
    member: {
      type: 'object',
      properties: MemberMapping.properties
    },
    membership_plan: {
      type: 'object',
      properties: MembershipPlanMapping.properties
    },
    action: { type: 'text' },
    valid_from: { type: 'date' },
    valid_until: { type: 'date' }
  }
}

module.exports = {
  provider: ProviderMapping,
  instructor: InstructorMapping,
  location: LocationMapping,
  venue: VenueMapping,
  programme: ProgrammeMapping,
  programme_instance: ProgrammeInstanceMapping,
  member: MemberMapping,
  membership_plan: MembershipPlanMapping,
  authorization: AuthorizationMapping,
  image: ImageMapping,
  video: VideoMapping
}
