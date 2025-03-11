class MethodValidator < ActiveModel::EachValidator
  # Usage:
  #
  # validates :cpf, method: :cpf_validation
  # validates :phone, method: { with: :phone }
  def validate_each(record, attribute, value)
    validation_method = options[:method] # Get the method's name.

    if validation_method && Validator.respond_to?(validation_method)
      is_valid = Validator.send(validation_method, value)
      record.errors.add(attribute, "is invalid") unless is_valid
    else
      raise ArgumentError, "Validation method #{ validation_method } is not defined."
    end
  end
end
